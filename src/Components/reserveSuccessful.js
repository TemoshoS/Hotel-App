import React from 'react'
import { useNavigate } from 'react-router-dom'
import successIcon from '../images/successful.PNG'

const ReserveSuccessful = () => {

    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/home');
    }
    return (
        <div >

            <div className='successful'>
                <img src={successIcon}/>
                <h3>Reservation Successful</h3>
                <p>Your room has been reserved</p>
                <button onClick={goToHome} className='button-success'>BACK HOME</button>
            </div>

        </div>
    )
}

export default ReserveSuccessful