import React, { useState } from "react";
import "../assets/styles/components/form.scss";
import CustomCheckbox from "./Checkbox";
import Button from "./Button";
import Input from "./Input";

const Form = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const paragraphOneText = "Bee informed when we launch.";
  const paragraphTwoText = "Drop your deets and we’ll give you a buzz.";
  const checkbox1LabelText = "Count me in as a seller";
  const checkbox2LabelText = "Count me in as a buyer";

  const validateName = () => {
    if (name.trim() === "") {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handleCheckbox1Change = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckbox2Change = () => {
    setIsChecked2(!isChecked2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateName();
    validateEmail();

    if (!nameError && !emailError) {
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Checkbox 1:", isChecked1);
      console.log("Checkbox 2:", isChecked2);
    }
  };



  return (
    <form onSubmit={handleSubmit}>
      <div className="form__content">
        <div>
          <p className="form__paragraph-one">{paragraphOneText}</p>
          <p className="form__paragraph-two">{paragraphTwoText}</p>
        </div>
        <div className="form__input-container">
          <div className="mb-10">
            <Input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
                validateName();
              }}
            />
          </div>
          <Input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail();
            }}
          />
        </div>
        <div className="form__checkbox-container">
          <div className="form__checkbox">
            <CustomCheckbox
              isChecked={isChecked1}
              onChange={handleCheckbox1Change}
            />
            <label className="form__checkbox-text">{checkbox1LabelText}</label>
          </div>
          <div className="form__checkbox">
            <CustomCheckbox
              isChecked={isChecked2}
              onChange={handleCheckbox2Change}
            />
            <label className="form__checkbox-text">{checkbox2LabelText}</label>
          </div>
        </div>
        <div className="form__btn-container">
          <Button
            type="submit"
            text="Sign me up"
            color="primary"
            size="medium"
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
