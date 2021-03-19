import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="container">
            <nav class="navbar navbar-expand-lg navbar-light ">
                <div class="container-fluid justify-content-end" >
                    <a class="navbar-brand" href="#">Navbar</a>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to='/home'>Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/destination'>Destination</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/blog'>Blog</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/contact'>Contact</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/login'>Login</Link>
                            </li>
                             
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;