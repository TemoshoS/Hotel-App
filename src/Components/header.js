import React from 'react'

const Header = () => {
    return (
        <div>

            <div className='nav-container'>
                <nav >
                    <div className='navbar-links-container'>
                        <a href='/home' className='nav-link' >Facilities</a>
                        <a href='/room' className='nav-link' >Rooms</a>
                    </div>
                </nav>
            </div>

            <div className='text-container'>
                <h5 >WELCOME TO</h5>
                <h1 >LUXURY </h1>
                <h4 >H O T E L S</h4>
                <b ><p>Book your stay and enjoy Luxury</p>
                    <p>redefined at the most affordable rates.</p></b>

            </div>


        </div>
    )
}

export default Header