import React from 'react';
import '../assets/styles/ui/checkbox.scss';

const CustomCheckbox = ({ isChecked, onChange }) => {
  return (
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="custom-checkbox__input"
      />
      <span className={`custom-checkbox__icon ${isChecked ? 'custom-checkbox__icon--checked' : ''}`} />
    </label>
  );
};

export default CustomCheckbox;
