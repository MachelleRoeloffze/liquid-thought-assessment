import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react-web';
import '../assets/styles/cardComponent.scss';
import animation1 from '../assets/lottie/glasses.json';
import animation2 from '../assets/lottie/onesie.json';
import animation3 from '../assets/lottie/pants.json';
import animation4 from '../assets/lottie/shoe.json';
import animation5 from '../assets/lottie/shorts.json';

const animations = [
  { name: 'glasses', animation: animation1 },
  { name: 'onesie', animation: animation2 },
  { name: 'pants', animation: animation3 },
  { name: 'shoe', animation: animation4 },
  { name: 'shorts', animation: animation5 },
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateInitialCards = () => {
  const cards = animations.flatMap((animation, index) => [
    {
      id: `card${index + 1}a`,
      animation: animation.animation,
      isFlipped: false,
      isMatched: false,
    },
    {
      id: `card${index + 1}b`,
      animation: animation.animation,
      isFlipped: false,
      isMatched: false,
    },
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
      } else {
        handleUnmatchedCards(card1, card2);
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
    }
  }, [flippedCards]);

  const restartGame = () => {
    const initialCards = generateInitialCards();
    setCards(initialCards);
    setMatchedCards([]);
    setMoves(0);
    setFlippedCards([]);

    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) => ({
        ...card,
        isFlipped: false,
      }));
      return updatedCards;
    });
  };

  const renderCards = () => {
    const firstRow = cards.slice(0, 5);
    const secondRow = cards.slice(5, 10);

    return (
      <div className='card-container'>
        <div className='card-row'>
          {firstRow.map((card) => (
            <div key={card.id} className='game-card'>
              <div
                className={`game-card-inner ${
                  card.isFlipped ? 'flipped' : ''
                } ${card.isMatched ? 'matched' : ''}`}
                onClick={() => handleCardClick(card.id)}
              >
                {card.isFlipped || card.isMatched ? (
                  <Lottie
                    options={{
                      loop: false,
                      autoplay: card.isMatched,
                      animationData: card.animation,
                    }}
                  />
                ) : (
                  <>
                    <div className='card-front'></div>
                    <div className='card-back'></div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className='card-row'>
          {secondRow.map((card) => (
            <div key={card.id} className='game-card'>
              <div
                className={`game-card-inner ${
                  card.isFlipped ? 'flipped' : ''
                } ${card.isMatched ? 'matched' : ''}`}
                onClick={() => handleCardClick(card.id)}
              >
                {card.isFlipped || card.isMatched ? (
                  <Lottie
                    options={{
                      loop: false,
                      autoplay: card.isMatched,
                      animationData: card.animation,
                    }}
                  />
                ) : (
                  <>
                    <div className='card-front'></div>
                    <div className='card-back'></div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className='legend'>
      <div>
        {renderCards()}
        <button onClick={restartGame}>Restart Game</button>
        <span>Moves: {moves}</span>
      </div>
    </div>
  );
};

export default Game;
