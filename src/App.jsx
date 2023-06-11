import Game from './components/Game';
import Form from './components/Form';

const App = () => {
  return (
    <div>
      <div className='flex'>
        <div className='w-8/12'>
          <div className=''>
            <Game />
          </div>
        </div>
        <div className='w-4/12 flex flex-col justify-end'>
          <div className='self-end'>
            <div>Mix & match the tiles to reveal a surprise!</div>
            <div>
              <img src='src/assets/images/img-bee.svg' alt='Your Image' />
            </div>
            <div className='paragraph-one'>
              <h1 className='text-3xl font-bold'>
                The perfect place to buy & sell premium, pre-loved fashion for
                little ones!
              </h1>
            </div>
            <div className='paragraph-two'>
              <h2>
                Delivering something sweet, real soon! Join the hive to stay in
                the loop.
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className='w-4/5 mb-10 m-auto'>
        <Form />
      </div>
    </div>
  );
};

export default App;
