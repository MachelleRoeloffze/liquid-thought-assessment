import Game from './components/Game';
import Form from './components/Form';

const App = () => {
  return (
    <div className='container'>
      <div className='container__left'>
        <Game />
      </div>
      <div className='container__right'>
        <div>
          <div className='container__right-text'>
            Mix & match the tiles to reveal a surprise!
          </div>
          <div className='container__right-image'>
            <img src='src/assets/images/img-bee.svg' alt='Your Image' />
          </div>
          <div className='container__right-paragraph-one'>
            <h1>
              The perfect place to buy & sell premium, pre-loved fashion for
              little ones!
            </h1>
          </div>
          <div className='container__right-paragraph-two'>
            <h2>
              Delivering something sweet, real soon! Join the hive to stay in
              the loop.
            </h2>
          </div>
        </div>
      </div>
      <div className='container'>
        <Form />
      </div>
    </div>
  );
};

export default App;
