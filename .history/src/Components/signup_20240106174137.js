import React, { useState } from 'react';
import authimage from '../images/hotels.jpg';
import { Link, useNavigate } from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const auth = getAuth();
    try {
      if (!name || !email || !password || !phone) {
        alert('Please fill in all the required fields.');
        return;
      }

      if (password.length < 7) {
        alert('Password must be at least 7 characters long.');
        return;
      }

      if (password !== passwordConfirm) {
        alert('Password and password confirmation do not match.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        phoneNumber: phone,
      });

      alert('user registerd succesfully');
      navigate('/sign')

   
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Email is already in use. Please use a different email.');
      } else {
        alert('Registration failed: ' + error.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const strength = checkPasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const checkPasswordStrength = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

    if (passwordRegex.test(password)) {
      return '✅';
    } else {
      return 'Weak Password';
    }
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
         
          <div className='input-field-container'>
            <input
              onChange={handlePasswordChange}
              type={showPassword ? 'text' : 'password'}
            />
            <i
              className={`password-toggle-icon ${showPassword ? 'eye-slash' : 'eye'}`}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </i>
          </div>
          <div className='password-strength'>
            {passwordStrength === '✅' ? (
              <span style={{ color: 'green' }}>{passwordStrength}</span>
            ) : (
              <span className='weak-password'>{passwordStrength}</span>
            )}
          </div>
        </div>
        <div className='input-container'>
          
          <div className='input-field-container'>
            <input
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type={showPassword ? 'text' : 'password'}
            />
            <i
              className={`password-toggle-icon ${showPassword ? 'eye-slash' : 'eye'}`}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </i>
          </div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className='register-button' onClick={handleRegister}>
          Signup
        </button>
        <p style={{ marginLeft: '40px' }}>
          Have an account?<Link to='/' className='login-link'>
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
