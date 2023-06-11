import { useState, useEffect } from 'react';
import Lottie from 'lottie-web';
import animation1 from '../assets/lottie/glasses.json';
import animation2 from '../assets/lottie/onesie.json';
import animation3 from '../assets/lottie/pants.json';
import animation4 from '../assets/lottie/shoe.json';
import animation5 from '../assets/lottie/shorts.json';

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateInitialCards = () => {
  const animations = [
    animation1,
    animation2,
    animation3,
    animation4,
    animation5,
  ];
  const cards = animations.flatMap((animation) => [
    { id: animation.name + '1', animation, isFlipped: false, isMatched: false },
    { id: animation.name + '2', animation, isFlipped: false, isMatched: false },
  ]);
  return shuffleArray(cards);
};

const Game = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setCards(generateInitialCards());
  }, []);

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      console.log(`Congratulations! You completed the game in ${moves} moves.`);
    }
  }, [matchedCards, moves]);

  const handleCardClick = (cardId) => {
    const clickedCardIndex = cards.findIndex((card) => card.id === cardId);
    const clickedCard = cards[clickedCardIndex];

    if (clickedCard.isFlipped || clickedCard.isMatched) {
      return;
    }

    let updatedCards = [...cards];

    if (flippedCards.length === 0) {
      updatedCards[clickedCardIndex].isFlipped = true;
      setFlippedCards([cardId]);
    } else if (flippedCards.length === 1) {
      updatedCards[clickedCardIndex].isFlipped = true;
      setFlippedCards((prev) => [...prev, cardId]);

      const [card1] = flippedCards;
      const card2 = cardId;

      if (
        cards.find((card) => card.id === card1).animation ===
        clickedCard.animation
      ) {
        updatedCards = updatedCards.map((card) =>
          card.id === card1 || card.id === card2
            ? { ...card, isMatched: true }
            : card
        );
        setMatchedCards((prev) => [...prev, card1, card2]);
      }
    }

    setCards(updatedCards);
    setMoves((prev) => prev + 1);
  };

  const handleUnmatchedCards = (card1, card2) => {
    setTimeout(() => {
      const updatedCards = cards.map((card) =>
        card.id === card1 || card.id === card2
          ? { ...card, isFlipped: false }
          : card
      );
      setCards(updatedCards);
      setFlippedCards([]);
    }, 1000);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      const card1Animation = cards.find((card) => card.id === card1).animation;
      const card2Animation = cards.find((card) => card.id === card2).animation;

      if (card1Animation === card2Animation) {
        const updatedCards = cards.map((card) =>
          card.id === card1 || card.id === card2
            ? { ...card, isMatched: true }
            : card
        );
        setCards(updatedCards);
        setMatchedCards((prev) => [...prev, card1, card2]);
        setFlippedCards([]);
      } else {
        handleUnmatchedCards(card1, card2);
      }

      setMoves((prev) => prev + 1);
    }
  }, [flippedCards]);

  const restartGame = () => {
    const initialCards = generateInitialCards();
    setCards(initialCards);
    setMatchedCards([]);
    setMoves(0);
    setFlippedCards([]);

    setTimeout(() => {
      const updatedCards = initialCards.map((card) => ({
        ...card,
        isFlipped: false,
      }));
      setCards(updatedCards);
    }, 500);
  };

  const renderCards = () => {
    const chunkSize = 5;
    const rows = [];

    for (let i = 0; i < cards.length; i += chunkSize) {
      const chunk = cards.slice(i, i + chunkSize);
      const row = (
        <div key={i} className='flex mb-4'>
          {chunk.map((card) => (
            <div key={card.id} className='game-card'>
              <div
                className={`w-40 h-40 game-card-inner ${
                  card.isFlipped ? 'flipped' : ''
                } ${card.isMatched ? 'matched' : ''}`}
                onClick={() => handleCardClick(card.id)}
              >
                {card.isFlipped || card.isMatched ? (
                  <Lottie
                    animationData={card.animation}
                    loop={false}
                    autoplay={card.isMatched}
                  />
                ) : (
                  <div className='card-back'></div>
                )}
              </div>
            </div>
          ))}
        </div>
      );
      rows.push(row);
    }

    return <div className=''>{rows}</div>;
  };

  return (
    <div className='container mx-auto'>
      {renderCards()}
      <button className='' onClick={restartGame}>
        Restart
      </button>
    </div>
  );
};

export default Game;
