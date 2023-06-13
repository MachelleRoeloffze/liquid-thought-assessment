import PropTypes from 'prop-types';
import '../assets/styles/components/card.scss';

const GameCard = ({ id, isFlipped, isMatched, onClick }) => {
  const handleClick = () => {
    if (!isMatched && !isFlipped) {
      onClick(id);
    }
  };

  return (
    <div className='game-card'>
      <div
        className={`game-card-inner ${isFlipped ? 'flipped' : ''} ${
          isMatched ? 'matched' : ''
        }`}
        onClick={handleClick}
      >
        {isFlipped || isMatched ? (
          <>
            <div className='card-front'></div>
            <div className='card-back'></div>
          </>
        ) : null}
      </div>
    </div>
  );
};

GameCard.propTypes = {
  id: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool,
  isMatched: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default GameCard;
