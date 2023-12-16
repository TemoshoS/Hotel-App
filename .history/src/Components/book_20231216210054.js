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
import AuthService from '../services/authService';

const Book = () => {
    const navigate = useNavigate();
    const { itemId } = useParams();
    const [room, setRoom] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [user, setUser] = useState('');
    

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
        const fetchUserData = async ()=>{
           
            try {
                 const currentUser = await AuthService.getCurrentUser();
                 setUser(currentUser);
                 if(currentUser){
                    setName(currentUser.displayName || '');
                    setEmail(currentUser.email || '');
                 }
            } catch (error) {
                console.log(error.message);
            }
        }

      

        fetchRoom();
        fetchUserData();
        

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
            bookRoom();
          },
          onCancel(){
            alert('you have canceled the transaction')
          }
        })
      }

      const bookRoom = async () => {
        try {
            
            const currentUser = await AuthService.getCurrentUser();
            if (!currentUser) {
                alert('Please log in to book a room.');
                return;
            }
    
           
            if (!name || !email || !phoneNumber) {
                alert('Please fill in all required fields.');
                return;
            }
    
            
            if (!room || !searchParams) {
                alert('Unable to proceed with the booking. Please try again.');
                return;
            }
    
            
            const bookingData = await bookHotel(
                itemId,
                room.roomName, 
                currentUser,
                searchParams.checkInDate,
                searchParams.checkOutDate,
                phoneNumber,
                {
                    rooms: searchParams.rooms || 0,
                    adults: searchParams.adults || 0,
                    children: searchParams.children || 0,
                }
            );
    
            
            alert('Room is successfully booked!\nDetails:\n' +
                `Room: ${room.roomName}\n` +
                `Check-in: ${searchParams.checkInDate}\n` +
                `Check-out: ${searchParams.checkOutDate}\n` +
                `Rooms: ${searchParams.rooms}\n` +
                `Adults: ${searchParams.adults}\n` +
                `Children: ${searchParams.children}\n` +
                `Guest Name: ${name}\n` +
                `Guest Email: ${email}\n` +
                `Guest Phone Number: ${phoneNumber}\n`
            );
    
            
            
        } catch (error) {
            console.log(error.message);
        }
    };




    return (
        <div >
            <NavBar />
            <div style={{justifyContent:'center', display:'flex', alignItems:'center'}}>
            
            </div>
            <Footer />
        </div>
    )
}

export default Book