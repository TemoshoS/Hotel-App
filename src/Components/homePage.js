import React, { useEffect, useState } from 'react';
import NavBar from './navBar';
import { getRooms } from '../services/roomServices';
import { useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Footer from './footer';
import SearchForm from './searchForm';



const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [searchParams, setSearchParams] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const roomsData = await getRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error('Error fetching rooms:', error.message);
        setRooms([]);
      }
    };

    fetchRoomsData();

    
  }, []);

  const handleSearch = (searchParams) => {
    setSearchParams(searchParams);
    console.log('Search Parameters:', searchParams);
  };

  const gotoBookings = (itemId) => {
    navigate(`/book/${itemId}`,{state: {searchParams}});
  }

 
  const StarRating = ({ rating }) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'star-filled' : 'star-empty'}>&#9733;</span>
    ));
  
    return <div className="star-rating">{stars}</div>;
  }

  // Style for the slideshow
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: '50vh',
    width: '100%'
  };

  // Images for the slideshow
  const slideImages = [
    {
      url: 'https://cdn.pixabay.com/photo/2015/01/10/11/39/hotel-595121_1280.jpg',
      welcomeText: {
        h5: 'Temosho welcomes you to',
        h1: 'Temosho maduane laxury hotel',
        h4: 'H O T E L S',
        boldText: [
          'Book your stay and enjoy Luxury',
          'redefined at the most affordable rates.'
        ]
      }
    },
    {
      url: 'https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg',
      welcomeText: {
        h5: 'ANOTHER WELCOME TO',
        h1: 'AMAZING',
        h4: 'ACCOMMODATIONS',
        boldText: [
          'Experience comfort like never before',
          'with our exceptional amenities.'
        ]
      }
    },
    {
      url: 'https://cdn.pixabay.com/photo/2020/04/17/12/24/bed-5054985_1280.jpg',
      welcomeText: {
        h5: 'DISCOVER',
        h1: 'SERENITY',
        h4: 'IN EVERY STAY',
        boldText: [
          'Escape to a tranquil haven',
          'and make every moment memorable.'
        ]
      }
    },
  ];
  


  return (
    <div>

          <NavBar />
         
             {/* Slideshow */}
        <div className="slide-container">
        <Slide>
  {slideImages.map((slideImage, index) => (
    <div key={index}>
      <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
        <div className='caption-container'>
          <h5>{slideImage.welcomeText.h5}</h5>
          <h1>{slideImage.welcomeText.h1}</h1>
          <h4>{slideImage.welcomeText.h4}</h4>
          
            {slideImage.welcomeText.boldText.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          
        </div>
      </div>
    </div>
  ))}
</Slide>

        </div>
          
              <SearchForm onSearch={handleSearch} />
          
              <div className='facilities-grid'>
            {rooms.map((room) => (
              <div key={room.id} className='facility'>
                <button className='heart-button' >
                  &#x2665;
                </button>
                <img src={room.roomImage} className='facility-image' alt='Room' />
                <div className='facility-details'>
                  <div className='facility-name'>{room.roomName}</div>
                  <div className='facility-description'>{room.roomDescription}</div>
                  <div className='facility-price'>
                    <span className='facility-price-label'>Price:</span> R{room.roomPrice}
                  </div>
                  <StarRating rating={room.starRating} />
                  <button
                    onClick={() => gotoBookings(room.id)}
                    className='facility-book-button'
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Footer />
    </div>
  );
};

export default HomePage;
