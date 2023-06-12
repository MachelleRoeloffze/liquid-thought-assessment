import PropTypes from "prop-types";
import "../assets/styles/cardComponent.scss";

const GameCard = ({ id, isFlipped, isMatched, onClick, animation }) => {
  const handleClick = () => {
    if (!isMatched && !isFlipped) {
      onClick(id);
    }
  };

  return (
    <div className="game-card">
      <div
        className={`game-card-inner ${isFlipped ? "flipped" : ""} ${
          isMatched ? "matched" : ""
        }`}
        onClick={handleClick}
      >
        {isFlipped || isMatched ? (
          <div className="animation-container">
            <Lottie
              options={{
                loop: false,
                autoplay: isMatched,
                animationData: animation,
              }}
            />
          </div>
        ) : (
          <>
            <div className="card-front"></div>
            <div className="card-back"></div>
          </>
        )}
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
