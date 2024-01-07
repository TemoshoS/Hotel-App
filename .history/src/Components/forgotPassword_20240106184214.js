import React, { useState } from 'react'
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import authimage from '../images/hotels.jpg';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const ResetPasword=()=>{
   sendPasswordResetEmail(auth, email).then(()=>{
    alert('Check your email')
   }).catch((error)=>{

   })

    };

    const goToSign=()=>{
        navigate('/sign')
    }

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
          <p className="heading1">Reset password</p>

            <div className="input-container">
        <div className="input-field-container">
            <input type='text' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} /><br />
            
            </div>
        </div><button className='submit-button' onClick={ResetPasword}>Reset</button>

        <button  className='submit-button'onClick={goToSign}>login</button>
            </div>
        </div>
    )
}

export default ForgotPassword
