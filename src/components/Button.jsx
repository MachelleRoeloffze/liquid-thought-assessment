import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/ui/button.scss';

const Button = ({ text, onClick, color, size, outline }) => {
  const buttonClass = `button ${
    color ? `button--${color}` : ''
  } ${size ? `button--${size}` : ''} ${outline ? 'button--outline' : ''}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  outline: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  color: 'primary',
  size: 'medium',
  outline: false,
};

export default Button;
