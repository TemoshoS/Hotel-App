import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import authimage from '../images/hotels.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      console.error(error.message);
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
      <div className="auth">
        <p className="heading">Login</p>

        <div className="input-container">
          
          <div className="input-field-container">
            <input placeholder='Email' type="text" onChange={(event) => setEmail(event.target.value)} />
          </div>
        </div>

        <div className="input-container">
          
          <div className="password-input-container">
            <input placeholder='Password' onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>

        <div className="input-container">
          <label>
            <Link
              to="forgotpassword"
              style={{ color: 'black'}}
            >
              Forgot password
            </Link>
          </label>
        </div>

        <button className="submit-button" onClick={login}>
          Login
        </button>

        <p style={{ marginLeft: '80px' }}>
          Don't have an account? <Link to="/register" style={{ color: 'red', textDecoration: 'none' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
