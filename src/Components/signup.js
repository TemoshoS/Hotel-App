import React, { useState } from 'react';
import { register } from '../services/authService';
import authimage from '../images/hotels.jpg';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!name || !email || !phone || !password) {
        setError('All fields are required');
        return;
      } else {
        setError(null);
      }
  
      await register(email, password, name, phone);
      
      // Display success message only if there is no error
      alert('User registered successfully');
      navigate('/sign');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email address is already in use. Please choose a different one.');
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
     
      style={{
        backgroundImage: `url(${authimage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className='auth' >
        <p className="heading">Sign up</p>
        

        <div className="input-container">
        <div className="input-field-container">
          <input placeholder='name' type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        </div>

        <div className="input-container">
          
        <div className="input-field-container">
            <input placeholder='Email' type="text" onChange={(event) => setEmail(event.target.value)} />
          </div>
        </div>

        <div className="input-container">
          
        <div className="input-field-container">
            <input placeholder='Phone' type="text" onChange={(event) => setPhone(event.target.value)} />
          </div>
        </div>

        <div className='input-container'>
          
          <div className='password-input-container'>
            <input placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
            />
            <i
              className={`password-toggle-icon ${showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className='register-button' onClick={handleRegister}>
          Signup
        </button>
        <p style={{ marginLeft: '40px' }}>
          Have an account?<Link to='/sign' className='login-link'>
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
