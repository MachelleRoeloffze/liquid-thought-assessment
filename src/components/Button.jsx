import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, onClick, color, size, outline }) => {
  const buttonClass = `button ${color ? `button--${color}` : ''} ${
    size ? `button--${size}` : ''
  } ${outline ? 'button--outline' : ''}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {text && <span>{text}</span>}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  size: PropTypes.oneOf(['xsmall','small', 'medium']),
  outline: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  color: 'primary',
  size: 'medium',
  outline: false,
};

export default Button;
