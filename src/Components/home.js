import React from 'react';
import hotelp from '../images/hotel.jpg';

const Home = () => {
    return (
        <div>
            <table>
                <tr>
                    <td>
                        <div className='image-container'>
                            <img src={hotelp} className='hotel-image' alt='Hotel' />
                            <div className='nav-container'>
                                <nav >
                                    <div className='navbar-links-container'>
                                        <a href='' className='nav-link' style={{fontSize:'25px'}}>Facilities</a>
                                        <a href='' className='nav-link' style={{fontSize:'25px'}}>Rooms</a>
                                    </div>
                                </nav>
                            </div>

                            <div className='text-container'>
                                <p style={{fontSize:'70px'}}>WELCOM TO</p>
                                <h1 style={{fontSize:'120px',fontFamily:'serif'}}>LUXURY </h1>
                                <h4 style={{fontSize:'50px',fontFamily:'serif',wordSpacing:'40px'}}>H O T E L S</h4>
                                <b style={{fontSize:'18px'}}><p>Book your stay and enjoy Luxury</p>
                                <p>redefined at the most affordable rates.</p></b>

                            </div>
                        </div>
                    </td>
                </tr>
                <tr className='App'>
                    <td>
                        <div className='facilities'>
                        <h1>FACILITIES</h1>
                        <p style={{color:'rgb(12, 12, 82)'}}>We want your stay at out lush hotel to be truly unforgtable. This is why we give special attention to all of your needs so<br/>
                        &nbsp; that we can ensure an experiance quite uniquw. Luxury hotels offers the perfect setting with stunning views for leisure<br/>
                        &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; and our modern luxury resort facilities will help you enjoy the best of all. </p>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default Home;
