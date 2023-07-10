import React,{ useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const naviagte = useNavigate();

    const login=()=>{

        signInWithEmailAndPassword(auth, email, password).then(()=>{

            alert('login successfully');
            naviagte('/home');

        }).catch((error)=>{
            console.log(error.message);

        })
        

    }

    return (
        <div>

            <div className='login-card'>
                <h2 className='heading'>Sign in</h2>
                <div className='input-container'>

                    <label>email</label>
                    <input type='text' onChange={(event) => setEmail(event.target.value)} />

                </div>

                <div className='input-container'>
                    <label>Password</label>
                    <input type='text' onChange={(event) => setPassword(event.target.value)} />

                </div>

                <button onClick={login}>Login</button>

                <p>Don't have an account ? <Link to='/register' style={{color:'green', textDecoration:'none'}}>Sign up</Link></p>



            </div>

        </div>
    )
}


export default Signin;