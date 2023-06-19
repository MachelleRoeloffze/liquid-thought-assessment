import React, { useState } from "react";
import CustomCheckbox from "./Checkbox";
import Button from "./Button";
import Input from "./Input";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const paragraphOneText = "Bee informed when we launch.";
  const paragraphTwoText = "Drop your deets and we’ll give you a buzz.";
  const checkbox1LabelText = "Count me in as a seller";
  const checkbox2LabelText = "Count me in as a buyer";

  const validateName = () => {
    if (name.trim() === "") {
      return "Please enter your name.";
    }
    return "";
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailPattern.test(email);

    if (!isValid) {
      return "Please enter a valid email address.";
    }
    return "";
  };

  const handleCheckbox1Change = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckbox2Change = () => {
    setIsChecked2(!isChecked2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setNameError(validateName());
    setEmailError(validateEmail());

    if (
      name.trim() !== "" &&
      email.trim() !== "" &&
      !nameError &&
      !emailError
    ) {
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Checkbox 1:", isChecked1);
      console.log("Checkbox 2:", isChecked2);
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setIsChecked1(false);
    setIsChecked2(false);
    setNameError("");
    setEmailError("");
  };
  

  return (
    <div className="form">
      {submitted ? (
        <div className="form__content">
          <div className="form__thank-you">
          <Button
            onClick={handleClose}
            color="tertiary"
            size="xsmall"
            outline={true}
          />
            <p>
              <strong className="bold">Thank you!</strong>
            </p>
            <p>We’ll see you in your inbox soon!</p>
          </div>
        
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form__content">
            <div>
              <p className="form__paragraph-one">{paragraphOneText}</p>
              <p className="form__paragraph-two">{paragraphTwoText}</p>
            </div>
            <div className="form__input-container">
              <div className={`mb-10 ${nameError ? "input--error" : ""}`}>
                <Input
                  type="text"
                  value={name}
                  placeholder="Your name"
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setNameError(validateName())}
                />
              </div>
              <div className={`${emailError ? "input--error" : ""}`}>
                <Input
                  type="email"
                  value={email}
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailError(validateEmail())}
                />
              </div>
            </div>
            <div className="form__checkbox-container">
              <div className="form__checkbox">
                <CustomCheckbox
                  isChecked={isChecked1}
                  onChange={handleCheckbox1Change}
                />
                <label className="form__checkbox-text">
                  {checkbox1LabelText}
                </label>
              </div>
              <div className="form__checkbox">
                <CustomCheckbox
                  isChecked={isChecked2}
                  onChange={handleCheckbox2Change}
                />
                <label className="form__checkbox-text">
                  {checkbox2LabelText}
                </label>
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
      )}
    </div>
  );
};

export default Form;
