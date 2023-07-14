import React, { useEffect, useState } from 'react'
import view from '../images/view.jpg'
import { useParams } from 'react-router-dom';

const Book = () => {
    const [countchlid, setCounterChild] = useState(0);
    const [countadult, setCountAdult] = useState(0);
    const [countnight, setCountNight] = useState(0);
    const {itemId} = useParams(); // Retrieve the itemId from the URL
    const [rooms, setRooms] = useState(null)


    useEffect(()=>{
        const fetchRoom = async()=>{
            try {
                const roomData = await fetchRoonDetails(itemId);
                setRooms(roomData);
                
            } catch (error) {
                console.log(error.message);
                
            }
        }
    },[itemId]);

    const fetchRoonDetails = async(itemId)=>{
        const selectedRoom = rooms.fins((rooms)=>rooms.id===itemId);
        return selectedRoom;
    }

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

    if (!rooms) {
        return <div>Loading...</div>; // Add a loading state while the room details are being fetched
      }


    return (


        <div>
            <div className='reserve-card'>
                <img src={view} className='room-view' alt='roomview' />
                <div>
                    <h2 className='room-name'>{rooms.roomName}</h2>
                </div>

                <div >
                    <p className='reserve-description'>Wifi * Air conditining * Kitchen-heating * smokers <br /> Parkng * Balcony * Animal friendly
                        <span style={{ marginLeft: '390px', fontWeight: 'bold' }}>Children
                            <button className='decrement' onClick={decrementChild}> <i>-</i></button>{countchlid}<button className='increment' onClick={incrementChild}><i>+</i></button>
                        </span>
                        <br /><span style={{ marginLeft: '600px', fontWeight: 'bold' }}>Adults
                            <button className='decrement' onClick={decrementAdults}><i>-</i></button>{countadult}<button className='increment' onClick={incrementAdults}><i>+</i></button>
                        </span>
                        <br /><span style={{ marginLeft: '600px', fontWeight: 'bold' }}>Nights
                            <button className='decrement' onClick={decrementNights}><i>-</i></button>{countnight}<button className='increment' onClick={incrementNights}><i>+</i></button>
                        </span></p>
                </div>
                <h3>
                    <span style={{ marginLeft: '1300px', fontWeight: 'bold' }}> R 500</span>
                    <span style={{ fontSize: '16px', marginLeft: '50px' }}>total</span>
                </h3>

                <button className='reserve-button'>RESERVE</button>

            </div>



        </div>
    )
}

export default Book