import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db , auth} from '../config/firebase'
import { onAuthStateChanged, getAuth } from 'firebase/auth';


const Book = () => {
    const [countchlid, setCounterChild] = useState(0);
    const [countadult, setCountAdult] = useState(0);
    const [countnight, setCountNight] = useState(0);
    const navigate = useNavigate();
    const { itemId } = useParams(); // Retrieve the itemId from the URL
    const [room, setRoom] = useState(null);
    const [user, setUser] = useState(null);
    


    useEffect(() => {
        
        const fetchRoom = async () => {
            try {
                // Fetch the room details using the itemId
                const roomData = await fetchRoomDetails(itemId);
                setRoom(roomData);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchRoom();
    }, [itemId]);

    const fetchRoomDetails = async (itemId) => {
        try {
          const roomRef = doc(db, 'rooms', itemId);
          const roomSnapshot = await getDoc(roomRef);
          return { id: roomSnapshot.id, ...roomSnapshot.data() };
        } catch (error) {
          console.log(error.message);
          return null;
        }
      };
      
    /*children decrement and increment*/
    const incrementChild = () => {

        const newCount = countchlid + 1;
        setCounterChild(newCount);

    }

    const decrementChild = () => {
        const newCount = countchlid - 1;
        setCounterChild(newCount);

    }

    /*adults decrement and increment*/

    const incrementAdults = () => {

        const newCount = countadult + 1;
        setCountAdult(newCount);

    }

    const decrementAdults = () => {
        const newCount = countadult - 1;
        setCountAdult(newCount);

    }

    /*nights decrement and increment*/
    const incrementNights = () => {

        const newCount = countnight + 1;
        setCountNight(newCount);

    }

    const decrementNights = () => {
        const newCount = countnight - 1;
        setCountNight(newCount);

    }


    const addTocart=async ()=>{

        try {
            const cartItem= {
                room:room
            };
            const cartRef = await addDoc(collection(db, 'cart'),cartItem);
            alert('added to cart successfully', cartRef.id);
            navigate('/successful')

        } catch (error) {

            console.log(error.message);
            
        }
        
    };
    



    return (


        <div>
            <div className='reserve-card' >
                <img src={room && room.roomImage ? room.roomImage : ''} className='room-view' alt='roomview' />
                <div>
                    <h2 className='room-name'>{room ? room.roomName : ''} </h2>
                </div>

                
                    <p className='reserve-description'>{room ? room.roomDescription :''}</p>
                    <div>
                        <span className='reserve-increment'>Children
                            <button className='decrement' onClick={decrementChild}> <i>-</i></button><span className="count">{countchlid}</span><button className='increment' onClick={incrementChild}><i>+</i></button>
                        </span>
                        <br /><span className='reserve-increment' >Adults
                            <button className='decrements' onClick={decrementAdults}><i>-</i></button><span className="count">{countadult}</span><button className='increment' onClick={incrementAdults}><i>+</i></button>
                        </span>
                        <br /><span className='reserve-increment'>Nights
                            <button className='decrements' onClick={decrementNights}><i>-</i></button><span className="count">{countnight}</span><button className='increment' onClick={incrementNights}><i>+</i></button>
                        </span>
                        </div>
              
                <h3  className='roomPrice'>
                    <span> R {room ? room.roomPrice : ''}</span>
                    <span className='total'>total</span>
                </h3>

                <button className='reserve-button' onClick={addTocart}>RESERVE</button>

            </div>



        </div>
    )
}

export default Book