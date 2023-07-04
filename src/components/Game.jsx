import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react-web';
import glassesAnimation from '../assets/lottie/glasses.json';
import onesieAnimation from '../assets/lottie/onesie.json';
import pantsAnimation from '../assets/lottie/pants.json';
import shoeAnimation from '../assets/lottie/shoe.json';
import shortsAnimation from '../assets/lottie/shorts.json';
import Button from './Button';

const animations = [
  { name: 'glasses', animation: glassesAnimation },
  { name: 'onesie', animation: onesieAnimation },
  { name: 'pants', animation: pantsAnimation },
  { name: 'shoe', animation: shoeAnimation },
  { name: 'shorts', animation: shortsAnimation },
];

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const generateInitialCards = () => {
  const cards = animations.flatMap((animation, index) => {
    const letterIndex = Math.floor(index / 2);
    const letter = letters[letterIndex];

    return [
      {
        id: `card${index + 1}a`,
        letter: letter,
        animation: animation.animation,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: `card${index + 1}b`,
        letter: letter,
        animation: animation.animation,
        isFlipped: false,
        isMatched: false,
      },
    ];
  });

  return shuffleArray(cards);
};

const Game = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);

  useEffect(() => {
    setCards(generateInitialCards());
  }, []);

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
        setFlippedCards([]);
      } else {
        handleUnmatchedCards(card1, card2);
      }
    }

    setCards(updatedCards);
    setMoves((prev) => prev + 1);
  };

  const handleUnmatchedCards = (card1, card2) => {
    setTimeout(() => {
      const updatedCards = cards.map((card) => {
        if (card.id === card1 || card.id === card2) {
          return { ...card, isFlipped: false };
        } else {
          return card;
        }
      });
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

  useEffect(() => {
    if (matchedCards.length === cards.length && moves > 0) {
      const newRoundsPlayed = roundsPlayed + 1;
      setRoundsPlayed(newRoundsPlayed);
      setIsGameComplete(true);
    }
  }, [matchedCards, moves]);

  const resetGame = () => {
    setCards(generateInitialCards());
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setIsGameComplete(false);
  };

  const renderCards = () => {
    return cards.map((card) => (
      <div
        key={card.id}
        className={`game-card ${card.isFlipped ? 'flipped' : ''} ${
          card.isMatched ? 'matched' : ''
        }`}
        onClick={() => handleCardClick(card.id)}
      >
        <div className='card-back'>
          {card.isFlipped || card.isMatched ? (
            <Lottie
              options={{
                loop: false,
                autoplay: card.isMatched,
                animationData: card.animation,
              }}
            />
          ) : null}
        </div>
        <div className='card-front'></div>
      </div>
    ));
  };

  return (
    <div>
      <div className='card-container'>{renderCards()}</div>
      <div className='legend'>
        <p>Moves: {moves}</p>
        <p>Rounds Played: {roundsPlayed}</p>
        {isGameComplete && (
          <Button
            type='text'
            text='Reset'
            color='primary'
            size='medium'
            onClick={resetGame}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
