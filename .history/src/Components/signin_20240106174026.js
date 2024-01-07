import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/authService'; 
import authimage from '../images/hotels.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [userError, setUserError] = useState(null);
  const [passError, setPassError] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all the required fields.');
      return;
    }

    const { user, error } = await AuthService.login(email, password);

    if (user) {
      setUserError(null);
      navigate('/homePage');
    } else {
      if (error.code === 'auth/user-not-found') {
        setUserError('User does not exist.');
      } else if (error.code === 'auth/wrong-password') {
        setPassError('Wrong password.');
      } else {
        setError(error.message);
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
      <div className="auth">
        <p className="heading">Login</p>

        <div className="input-container">
          
          <div className="input-field-container">
            <input placeholder='Email' type="text" onChange={(event) => setEmail(event.target.value)} />
          </div>
        </div>

        <div className="input-container">
          
          <div className="input-field-container">
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
              to="/forgotpassword"
              style={{ color: 'black'}}
            >
              Forgot password
            </Link>
          </label>
        </div>

        <button className="submit-button" onClick={handleLogin}>
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
