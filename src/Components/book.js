import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRoomDetails } from '../services/roomServices';
import { bookHotel } from '../services/roomServices';
import NavBar from './navBar';
import Footer from './footer';



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
    }, [itemId]);


    const bookRoom = async () => {
        try {
            const cartData = await bookHotel(itemId);
            setRoom(cartData);
            navigate('/successful');
        } catch (error) {
            console.log(error.message);
        }
    };



    return (
        <div>
            <NavBar />
            <div className='reserve-card'>
                <div className='images-container'>
                    <div>
                        <img src={room && room.roomImage ? room.roomImage : ''} className='room-view' alt='roomview' />
                    </div>
                    <div className='room-container'>
                        <img src={room && room.roomImage ? room.roomImage : ''} className='room-view1' alt='roomview' />
                        <img src={room && room.roomImage ? room.roomImage : ''} className='room-view2' alt='roomview' />
                        <img src={room && room.roomImage ? room.roomImage : ''} className='room-view3' alt='roomview' />

                    </div>

                    <div>
                        <h3 className='roomPrice'>
                            <span>R {room ? room.roomPrice : ''}</span>

                        </h3><
                            button className='reserve-button' onClick={bookRoom}>
                            RESERVE
                        </button>
                    </div>
                </div>

                <div>
                </div>

                <h2 className='room-name'>{room ? room.roomName : ''}</h2>

                <p className='reserve-description'>{room ? room.roomDescription : ''}</p>


            </div>

            <Footer />
        </div>
    )
}

export default Book