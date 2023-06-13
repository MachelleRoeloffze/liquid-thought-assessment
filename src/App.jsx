import Game from './components/Game';
import Form from './components/Form';
import Button from './components/Button';

const App = () => {
  const mainText = "Mix & match the tiles to reveal a surprise!";
  const imageAlt = "Your Image";
  const paragraphOne = "The perfect place to buy & sell premium, pre-loved fashion for little ones!";
  const paragraphTwo = "Delivering something sweet, real soon! Join the hive to stay in the loop!";

  return (
    <div>
      <div className='container'>
        <div className='container__left'>
          <div className="game-container">
          <Game />
          </div>
        </div>
        <div className='container__right'>
          <div>
            <div className='container__right-text'>
              {mainText}
              <Button
            type="replay"
            text="Replay"
            color="secondary"
            size="small"
          />
            </div>
            <div className='container__right-image'>
              <img src='src/assets/images/img-bee.svg' alt={imageAlt} />
            </div>
            <div className='container__right-paragraph-one'>
              <h1>
                {paragraphOne}
              </h1>
            </div>
            <div className='container__right-paragraph-two'>
              <h2>
                {paragraphTwo}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className='form-container'>
        <Form mainText={mainText} paragraphOne={paragraphOne} paragraphTwo={paragraphTwo} />
      </div>
    </div>
  );
};

export default App;
