import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRoomDetails } from '../services/roomServices';
import { bookHotel } from '../services/roomServices';
import NavBar from './navBar';
import Footer from './footer';
import { fetchData } from '../services/apis';



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
        <div >
            <NavBar />
            <div className='reserve-card'>
                <div className='images-container'>
                    <div>
                        <img src={room && room.roomImage ? room.roomImage : ''} className='room-view' alt='roomview' />
                    </div>

                    <div>
                       
                        <div className='price-card'>
                        <input type="text" value={`Number of Days: ${9}`} readOnly />
                        <input
                            type="text"
                            value={`Rooms: ${2}, Adults: ${2}, Children: ${4}`}
                            readOnly
                        />
                            <h3 className='roomPrice'>
                                <span>R {room ? room.roomPrice : ''}</span>

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


            </div>

            <Footer />
        </div>
    )
}

export default Book