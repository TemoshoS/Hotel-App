import React from 'react'

const Header = () => {
    return (
        <div>

            <div className='nav-container'>
                <nav >
                    <div className='navbar-links-container'>
                        <a href='/home' className='nav-link' style={{ fontSize: '25px' }}>Facilities</a>
                        <a href='/room' className='nav-link' style={{ fontSize: '25px' }}>Rooms</a>
                    </div>
                </nav>
            </div>

            <div className='text-container'>
                <p style={{ fontSize: '70px' }}>WELCOME TO</p>
                <h1 style={{ fontSize: '120px', fontFamily: 'serif' }}>LUXURY </h1>
                <h4 style={{ fontSize: '50px', fontFamily: 'serif', wordSpacing: '40px' }}>H O T E L S</h4>
                <b style={{ fontSize: '18px' }}><p>Book your stay and enjoy Luxury</p>
                    <p>redefined at the most affordable rates.</p></b>

            </div>


        </div>
    )
}

export default Header