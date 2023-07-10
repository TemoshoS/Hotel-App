import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';


const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register=()=>{

    createUserWithEmailAndPassword(auth,email, password).then(()=>{
      alert("Registered successfully")

    }).catch((error)=>{
      console.log(error.message)


    })

  }

  return (
    <div>
      <div className="login-card">
        <h2 className="heading">Sign up</h2>

        <div className="input-container">
          <label >Email</label> <br />
          <input onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input-container">
          <label >Password</label> <br />
          <input onChange={(e) => setPassword(e.target.value)} />
        </div>

          <button onClick={register}>Sign up</button>


      </div>

    </div>
  )
}

export default Signup;
