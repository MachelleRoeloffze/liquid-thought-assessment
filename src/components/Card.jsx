import PropTypes from "prop-types";


const GameCard = ({ id, isFlipped, isMatched, onClick }) => {
  const handleClick = () => {
    if (!isMatched && !isFlipped) {
      onClick(id);
    }
  };

  return (
    <div
      className={`game-card ${isFlipped ? "flipped" : ""} ${
        isMatched ? "matched" : ""
      }`}
      onClick={handleClick}
    >
      {isFlipped || isMatched ? (
        <>
          <div className="card-front"></div>
          <div className="card-back"></div>
        </>
      ) : null}
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
