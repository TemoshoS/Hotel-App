import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRoomDetails } from '../services/roomServices';
import { bookHotel } from '../services/roomServices';
import NavBar from './navBar';
import Footer from './footer';
import PaystackPop from '@paystack/inline-js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCar, faSwimmingPool, faWifi, faPlane, faDumbbell, } from '@fortawesome/free-solid-svg-icons';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { useLocation } from 'react-router-dom';

const Book = () => {
    const navigate = useNavigate();
    const { itemId } = useParams();
    const [room, setRoom] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const searchParams = useLocation().state?.searchParams;

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



    const calculateTotalPrice = () => {
        if (room) {
            const totalPrice = 8 * room.roomPrice * 2;
            console.log('Total Price:', totalPrice);
            return totalPrice;
        }
        return 0;
    };

    const paywithpaystack =(e)=>{
        e.preventDefault();
    
        const paystack = new PaystackPop();
        const calculatedAmount = calculateTotalPrice();
    
        paystack.newTransaction({
          key:"pk_test_1614fb1b435881450bf82e4c90488b8143bed936",
          amount: calculatedAmount * 100,
          email:email,
          name:name,
          phoneNumber:phoneNumber,
    
          onSuccess(transaction){
            let message = `Payment Complete! Reference ${transaction.reference}`
            alert(message);
            // After successful payment, call handleConfirm to save the order data
          
          },
          onCancel(){
            alert('you have canceled the transaction')
          }
        })
      }



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

                        <div className='room-user-card'>
                            <div className='input-container'>
                                <label>Check In Date</label><br></br>
                                <input type="text" readOnly value={searchParams?.checkInDate || ''} /><br></br>
                                <label>Check Out Date</label><br></br>
                                <input type="text" readOnly value={searchParams?.checkOutDate || ''} /><br></br>


                                <label>Guests</label><br></br>
                                <input
                                    type="text"
                                    value={`Rooms: ${searchParams?.rooms || 0}, Adults: ${searchParams?.adults || 0}, Children: ${searchParams?.children || 0}`}
                                    readOnly
                                /></div>

                        </div>


                        <div className='price-card'>
                            <div className='input-container'>
                                <label>Full Name</label><br></br>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                /><br></br>

                                <label>Email</label><br></br>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}

                                />

                                <label>Phone Number</label><br></br>
                                <input
                                    type="text"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}

                                />
                            </div>

                            <h3 className='roomPrice'>
                                <span>Price: R{calculateTotalPrice()} </span>

                            </h3>< button className='reserve-button' onClick={paywithpaystack}>
                                PAY <FontAwesomeIcon icon={faCcVisa} size="2x" />
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