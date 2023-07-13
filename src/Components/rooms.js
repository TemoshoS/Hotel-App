import React from 'react'
import Header from './header'
import bedroom from '../images/bedroom.jpg'
import view from '../images/view.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const Room = () => {
    return (
        <div>
            <table>
                <tr>
                    <td>
                        <div className='image-container'>
                            <img src={bedroom} className='hotel-image' alt='Hotel' />
                            <Header />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={{ height: '30px' }}></td>
                </tr>
                <tr className='App'>
                    <td>
                        <div className='facilities'>
                            <h1>ROOMS AND RATES</h1>
                            <tr>
                                <td style={{ height: '30px' }}></td>
                            </tr>
                            <b>  <p >Each of our bright, light-flooded rooms come with everything you could possibly need for an comfortable stay. And yes,<br />
                                &nbsp;comfort isn't our only objective, we also value good design, sleek contemporary furnishing complemented<br />
                                &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; by the rich tones of nature's palette as visible from our rooms' sea-view windows and terraces.</p></b>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={{ height: '30px' }}></td>
                </tr>
                <tr>
                    <td>
                        <div className='item-card'>
                            <img src={view} className='room-view' alt='roomview' />
                            <div>
                            <h2 className='room-name'>The People's Brownstone</h2> 
                            <div className='heart'>
  <FontAwesomeIcon icon={faHeart} style={{ color: "#b6b7b9" }} />
</div>

                            </div>
                            <p className='description'>Wifi * Air conditining * Kitchen-heating * smokers <br /> Parkng * Balcony * Animal friendly</p>
                            <button className='book-button'>BOOK</button>
                            <div className='rating'
                            ><h3>
                                    4.0
                                    <i class="fas fa-star" style={{ color: '#316add', marginLeft: '30px' }}></i>
                                    <i class="fas fa-star" style={{ color: '#316add', marginLeft: '8px' }}></i>
                                    <i class="fas fa-star" style={{ color: '#316add', marginLeft: '8px' }}></i>
                                    <i class="fas fa-star" style={{ color: '#316add', marginLeft: '8px' }}></i>
                                    <i class="fas fa-star" style={{ color: '#d6e4ff', marginLeft: '8px' }}></i>
                                    <span style={{ fontSize: '16px', margin: '10px' }}>(7 Reviews)</span>
                                </h3>

                            </div>
                        </div>

                    </td>
                </tr>
                <tr>
                    <td style={{ height: '3000px' }}></td>
                </tr>
            </table>
        </div>
    )
}

export default Room