import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './RidersName.css'

const RidersName = (props) => {
    const { name, img } = props.rider
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const handleRide = () => {
        console.log('Clicked');
    }
    return (
        <div className='col-md-3 mt-5 col-sm-12 riders'>
            <Link to='/search-ride'>
                <div className='card card-div' >
                    <img src={img} alt="Rider Logo" />
                    <div className='card-body bg-light' >
                        <h4 className='card-text'>{name}</h4>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RidersName;