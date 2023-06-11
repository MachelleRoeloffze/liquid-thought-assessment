import PropTypes from 'prop-types';
import '../assets/styles/cardComponent.scss';

const GameCard = ({ id, value, isFlipped, isMatched, onClick }) => {
  const handleClick = () => {
    if (!isMatched && !isFlipped) {
      onClick(id);
    }
  };

  return (
    <div
      className={`game-card ${isFlipped ? 'flipped' : ''} ${
        isMatched ? 'matched' : ''
      }`}
      onClick={handleClick}
    >
      <div className='card-body'>
        <div className='card-front'></div>
        <div className='card-back'>{value}</div>
      </div>
    </div>
  );
};

GameCard.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool,
  isMatched: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default GameCard;
