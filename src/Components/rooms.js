import React from 'react'
import bedroom from '../images/bedroom.jpg'
import { useNavigate } from 'react-router-dom'
import {  collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useEffect, useState } from 'react'


const Room = () => {

    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    const gotoBookings = (itemId) => {
        navigate(`/book/${itemId}`);
    };

    useEffect(() => {

        getRooms();

    })



    const getRooms = (async () => {
        try {

            const querySnapShot = await getDocs(collection(db, "rooms"));
            const data = querySnapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))

            setRooms(data);

        } catch (error) {


            console.log(error.message);

        }

    });

    return (
        <div>
            <table>

                <tr>
                    <td>
                        <div className='image-container'>
                            <img src={bedroom} className='hotel-image' alt='Hotel' />
                      
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
                    <td></td>
                </tr>
                <tr>
                    <td>
                        {rooms.map((items) => (


                            <div className='item-card' key={items.id}>
                                <img src={items.roomImage} className='room-view' alt='roomview' />
                                <div>
                                    <h2 className='room-name'>{items.roomName}</h2>

                                    <div className='heart'>
                                        <i className="bi-heart"></i>
                                    </div>

                                </div>
                                <p className='description'> {items.roomDescription}</p>
                               <div className='button'> <button onClick={() => gotoBookings(items.id)} className='book-button'>BOOK</button></div>
                                <div className='rating'>
                                    <h3>
                                        4.0
                                        <i class="fas fa-star" style={{ color: '#316add', marginLeft: '30px' }}></i>
                                        <i class="fas fa-star" style={{ color: '#316add', marginLeft: '8px' }}></i>
                                        <i class="fas fa-star" style={{ color: '#316add', marginLeft: '8px' }}></i>
                                        <i class="fas fa-star" style={{ color: '#316add', marginLeft: '8px' }}></i>
                                        <i class="fas fa-star" style={{ color: '#d6e4ff', marginLeft: '8px' }}></i>
                                        <span style={{ fontSize: '16px', margin: '10px' }}>(7 Reviews)</span>
                                        <span className='price'>
                                        <span style={{ marginLeft: '300px', fontWeight: 'bold' }}> R {items.roomPrice}</span>
                                        <span style={{ fontSize: '16px', marginLeft: '50px' }}>/night</span>
                                        </span>
                                    </h3>

                                </div>
                            </div>
                        ))}
                    </td>
                </tr>
               
            </table>
        </div>
    )
}

export default Room