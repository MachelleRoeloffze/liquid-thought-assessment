import React from "react";
import Game from "./components/Game";
import Form from "./components/Form";
import imgBee from "./assets/images/img-bee.svg";
import imgArrow from "./assets/images/img-top-dotted-line.svg";

const App = () => {
  const mainText = "Mix & match the tiles to reveal a surprise!";
  const paragraphOne =
    'The perfect place to <strong class="bold">buy & sell</strong> premium, pre-loved fashion for little ones!';
  const paragraphTwo =
    '<strong class="bold">Delivering something sweet, real soon!</strong> Join the hive to stay in the loop!';

  return (
    <div>
      <div className="container">
        <div className="container__left">
          <Game />
        </div>
        <div className="container__right">
          <div className="container__right-text">{mainText}</div>
          {/* <div className="container__right-image-one">
            <img src={imgArrow} alt="arrow" />
          </div> */}
          <div className="container__right-image-two">
            <img src={imgBee} alt="Bee" />
          </div>
          <div className="container__right-paragraph-one">
            <h1 dangerouslySetInnerHTML={{ __html: paragraphOne }} />
          </div>
          <div className="container__right-paragraph-two">
            <h2 dangerouslySetInnerHTML={{ __html: paragraphTwo }} />
          </div>
        </div>
      </div>
      <div className="form-container">
        <Form
          mainText={mainText}
          paragraphOne={paragraphOne}
          paragraphTwo={paragraphTwo}
        />
      </div>
    </div>
  );
};

export default App;
