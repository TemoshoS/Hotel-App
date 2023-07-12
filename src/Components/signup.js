import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import authimage from '../images/login.jpg'
import { Link ,useNavigate} from 'react-router-dom';





const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const register = () => {

    createUserWithEmailAndPassword(auth, email, password).then(() => {
      navigate('/')

    }).catch((error) => {
      
      alert('Please enter atleast 7 digits')


    })

  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='auth-card'>
      <div className='auth'>

        <p className="heading">Sign up</p>
        <p>Register to access your account</p>


        <div class="input-container">
          <label >Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>


        <div className="input-container">
          <label >Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type='text' />
        </div>

        <div className='input-container'>
          <label>Password</label>
          <div className='password-input-container'>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
            />
            <i
              className={`password-toggle-icon ${showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}`}
              onClick={togglePasswordVisibility}
            ></i>

          </div>
        </div>


        <button className='submit-button' onClick={register}>SIGNUP</button>
        <p style={{ marginLeft: '130px' }}>Have an account?<Link to='/' className='login-link' >LOGIN</Link></p>

      </div>
      <img src={authimage} className='auth-image' />


    </div>
  )
}

export default Signup;
