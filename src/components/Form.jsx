import { useState } from 'react';
import '../assets/styles/FormComponent.scss';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    // You can access the form values with 'name' and 'email' variables
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Checkbox 1:', isChecked1);
    console.log('Checkbox 2:', isChecked2);
  };

  return (
    <form onSubmit={handleSubmit} className=''>
      <div className='form'>
        <div>
          <p className='form-paragraph-one'>Bee informed when we launch.</p>
          <p className='form-paragraph-two'>
            Drop your deets and we’ll give you a buzz.
          </p>
        </div>
        <div className='input-container'>
          <input
            type='text'
            value={name}
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            className=''
          />
          <input
            type='email'
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            className=''
          />
        </div>
        <div className='checkbox-container'>
          <div className='custom-checkbox'>
            <input
              type='checkbox'
              checked={isChecked1}
              onChange={() => setIsChecked1(!isChecked1)}
            />
            <span className='checkmark'></span>

            <label className='checkbox-text'>Count me in as a seller</label>
          </div>
          <div className='custom-checkbox'>
            <input
              type='checkbox'
              checked={isChecked2}
              onChange={() => setIsChecked2(!isChecked2)}
            />
            <span className='checkmark'></span>
            <label className='checkbox-text'>Count me in as a buyer</label>
          </div>
        </div>
        <div className='btn-container'>
          <button type='submit' className='submit-btn btn-text'>
            Sign me up
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
