import React from 'react';
import Header from './header';
import hotel from '../images/hotel.jpg';
import gym from '../images/gym.jpg'
import poolside from '../images/poolside.jpg'
import spa from '../images/spa.jpg'
import swimming from '../images/swimmingpool.jpg'
import resturant from '../images/resturant.jpg'
import laundry from '../images/laundry.jpg'



const Home = () => {
    return (
        <div>
            <table>
                <tr>
                    <td>
                        <div className='image-container'>
                            <img src={hotel} className='hotel-image' alt='Hotel' />
                           <Header/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={{ height: '30px' }}></td>
                </tr>
                <tr className='App'>
                    <td>
                        <div className='facilities'>
                            <h1>FACILITIES</h1>
                            <tr>
                                <td style={{ height: '30px' }}></td>
                            </tr>
                            <b><p >We want your stay at out lush hotel to be truly unforgtable. This is why we give special attention to all of your needs so<br />
                                &nbsp; that we can ensure an experiance quite uniquw. Luxury hotels offers the perfect setting with stunning views for leisure<br />
                                &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; and our modern luxury resort facilities will help you enjoy the best of all. </p>
                                </b>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={{ height: '30px' }}></td>
                </tr>

                <tr>
                    <td>
                        <div className='image-container'>
                            <img src={gym} className='gym-image' alt='gym' />
                            <div className='gym-container'>
                                <h1>THE GYM</h1>

                            </div>

                        </div>

                    </td>

                </tr>
                <tr>
                    <td style={{ height: '100px' }}></td>
                </tr>

                <tr>
                    <td>
                        <div className='image-container'>
                            <img src={poolside} className='poolside-image' alt='pool' />
                            <div className='poolside-container'>
                                <h1>POOLSIDE BAR</h1>

                            </div>

                        </div>

                    </td>

                </tr>
                <tr>
                    <td style={{ height: '100px' }}></td>
                </tr>

                <tr>
                    <td>
                        <div className='image-container'>
                            <img src={spa} className='spa-image' alt='spa' />
                            <div className='spa-container'>
                                <h1>THE SPA</h1>

                            </div>

                        </div>

                    </td>

                </tr>
                <tr>
                    <td style={{ height: '100px' }}></td>
                </tr>

                <tr>
                    <td>
                        <div className='image-container'>
                            <img src={swimming} className='swimmingpool-image' alt='spa' />
                            <div className='swimmingpool-container'>
                                <h1>SWIMMING POOL</h1>

                            </div>

                        </div>

                    </td>

                </tr>
                <tr>
                    <td style={{ height: '100px' }}></td>
                </tr>

                <tr>
                    <td>
                        <div className='image-container'>
                            <img src={resturant} className='resturant-image' alt='spa' />
                            <div className='resturant-container'>
                                <h1>RESTURANT</h1>

                            </div>

                        </div>

                    </td>

                </tr>
                <tr>
                    <td style={{ height: '100px' }}></td>
                </tr>

                <tr>
                    <td>
                        <div className='image-container'>
                            <img src={laundry} className='resturant-image' alt='spa' />
                            <div className='resturant-container'>
                                <h1>LAUNDRY</h1>

                            </div>

                        </div>

                    </td>

                </tr>
            </table>
        </div>
    );
};

export default Home;
