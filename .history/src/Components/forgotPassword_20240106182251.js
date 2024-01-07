import React, { useState } from 'react'
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import authimage from '../images/hotels.jpg';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const ResetPasword=()=>{
   sendPasswordResetEmail(auth, email).then(()=>{
    alert('Check your email')
   }).catch((error)=>{

   })

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
          <p className="heading">Rese</p>
            <div className="input-container">
        <div className="input-field-container">
            <input type='text' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} /><br />
            
            </div>
        </div><button className='submit-button' onClick={ResetPasword}>Reset passoword</button>
            </div>
        </div>
    )
}

export default ForgotPassword
