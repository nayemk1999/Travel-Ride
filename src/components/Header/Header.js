import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (

        <div className="container header">
            <div class="d-flex mb-3 mr-auto navbar-collapse">
                <div class="mr-auto p-4 link">Travel Ride</div>
                <div class="p-4"><Link className="link" to='/home'>Home</Link></div>
                <div class="p-4"><Link className="link" to='/destination'>Destination</Link></div>
                <div class="p-4 "><Link className="link" to='/blog'>Blog</Link></div>
                <div class="p-4 "><Link className="link" to='/contact'>Contact</Link></div>
                {
                    loggedInUser.email ? <div class="p-4 "><Link className="log-link" to='/search-ride'>{loggedInUser.name}</Link></div>
                        : <div class="p-4 "><Link className="log-link" to='/login'>Login</Link></div>
                }
            </div>
        </div>
    );
};

export default Header;