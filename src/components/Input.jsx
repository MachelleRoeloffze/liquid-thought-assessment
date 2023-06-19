import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, value, placeholder, onChange, error }) => {
  return (
    <div className={`input-container ${error ? 'input-container-error' : ''}`}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`input ${error ? 'input-error' : ''}`}
      />
      {error && <p className="input-error-message">{error}</p>}
    </div>
  );
};

Input.defaultProps = {
  value: '',
  placeholder: '',
  onChange: () => {},
  error: '',
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default Input;
