import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRoomDetails } from '../services/roomServices';
import { bookHotel } from '../services/roomServices';
import NavBar from './navBar';
import Footer from './footer';
import { fetchData } from '../services/apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCar, faSwimmingPool, faWifi, faPlane, faDumbbell } from '@fortawesome/free-solid-svg-icons';



const Book = () => {
    const navigate = useNavigate();
    const { itemId } = useParams();
    const [room, setRoom] = useState(null);


    useEffect(() => {

        const fetchRoom = async () => {
            try {

                const roomData = await fetchRoomDetails(itemId);
                setRoom(roomData);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchRoom();
        fetchData();

    }, [itemId]);



    const calculateTotalPrice = () => {
        if (room) {
            const totalPrice = 8 * room.roomPrice * 2;
            console.log('Total Price:', totalPrice);
            return totalPrice;
        }
        return 0;
    };



    const bookRoom = async () => {
        try {
            const cartData = await bookHotel(itemId);
            setRoom(cartData);
            navigate('/bookingform');
        } catch (error) {
            console.log(error.message);
        }
    };



    return (
        <div >
            <NavBar />
            <div className='reserve-card'>
                <div className='images-container'>
                    <div>
                        <img src={room && room.roomImage ? room.roomImage : ''} className='room-view' alt='roomview' />
                    </div>

                    <div>

                        <div className='price-card'>
                            <div className='input-container'>
                                <label>Number of days</label><br></br>
                                <input type="text" value={` ${9}`} readOnly /><br></br>


                                <label>Number of rooms</label><br></br>
                                <input
                                    type="text"
                                    value={`Rooms: ${2}, Adults: ${2}, Children: ${4}`}
                                    readOnly
                                /></div>
                            <h3 className='roomPrice'>
                                <span>Price: R{calculateTotalPrice()} </span>

                            </h3>< button className='reserve-button' onClick={bookRoom}>
                                RESERVE
                            </button>
                        </div>
                    </div>

                    <div></div>
                </div>

                <div>
                </div>

                <h2 className='room-name'>{room ? room.roomName : ''}</h2>

                <p className='reserve-description'>{room ? room.roomDescription : ''}</p>
                <div className='hotel-icons'>

                    
                <div >
                <FontAwesomeIcon icon={faCoffee} /> <span>Free breakfast</span>
                </div>

                <div>
                <FontAwesomeIcon icon={faCar} /> <span>Free Parking</span>
                </div>

                <div>
                <FontAwesomeIcon icon={faSwimmingPool} /> <span>Swimming pool</span>
                </div>

                <div>
                <FontAwesomeIcon icon={faWifi} /> <span>WiFi</span>
                </div>

                <div>
                <FontAwesomeIcon icon={faPlane} /> <span>Airport</span>
                </div>

                <div>
                <FontAwesomeIcon icon={faDumbbell} /> <span>Gym</span>
                </div>

                    
                
                
                
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Book