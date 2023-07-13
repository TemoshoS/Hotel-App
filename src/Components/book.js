import React from 'react'
import view from '../images/view.jpg'

const Book = () => {


    return (
        <div>
            <div className='reserve-card'>
                <img src={view} className='room-view' alt='roomview' />
                <div>
                    <h2 className='room-name'>The People's Brownstone</h2>
                </div>

                <div >
                <p className='reserve-description'>Wifi * Air conditining * Kitchen-heating * smokers <br /> Parkng * Balcony * Animal friendly <span style={{marginLeft:'500px'}}>Children</span><br/><span style={{marginLeft:'500px'}}>Children</span></p>
                </div>

                <button className='reserve-button'>RESERVE</button>
                
            </div>



        </div>
    )
}

export default Book