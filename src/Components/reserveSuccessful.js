import React from 'react'
import { useNavigate } from 'react-router-dom'


const ReserveSuccessful = () => {

    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    }
    return (
        <div >

            <div className='successful'>
            <i class="bi bi-check2-circle"></i>
                <h3>Reservation Successful</h3>
                <p>Your room has been reserved</p>
                <button onClick={goToHome} className='button-success'>BACK HOME</button>
            </div>

        </div>
    )
}

export default ReserveSuccessful