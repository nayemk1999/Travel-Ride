import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="container">
            <div class="d-flex bd-highlight mb-3">
                <div class="mr-auto p-4 bd-highlight">Travel Ride</div>
                <div class="p-4 bd-highlight"><Link to='/home'>Home</Link></div>
                <div class="p-4 bd-highlight"><Link to='/destination'>Destination</Link></div>
                <div class="p-4 bd-highlight"><Link to='/blog'>Blog</Link></div>
                <div class="p-4 bd-highlight"><Link to='/contact'>Contact</Link></div>
                {
                    loggedInUser.email ? <div class="p-4 bd-highlight"><Link to='/search-ride'>{loggedInUser.name}</Link></div>
                        : <div class="p-4 bd-highlight"><Link to='/login'>Login</Link></div>
                }


            </div>
        </div>
    );
};

export default Header;