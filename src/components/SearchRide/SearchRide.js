import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import { FakeData } from '../../fakeData/FakeData';
import './SearchRide.css'
import GoogleMap from '../GoogleMap/Map'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header/Header';

const SearchRide = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { id } = useParams();
    const [search, setSearch] = useState(false);
    const [searchRoute, setSearchRoute] = useState({})
    const [rideDetails, setRideDetails] = useState({});
    const { img, name, price, person } = rideDetails;

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        const riderId = FakeData.find(ride => ride.id === parseInt(id))
        setSearch(true)
        setRideDetails(riderId);
        setSearchRoute(data);
    };

    return (
        <div className="container">
            <Header></Header>
            <div className="row search-container">
                <div className="col-md-6 pt-3">
                    {!search ?
                        <form className='search-ride' onSubmit={handleSubmit(onSubmit)}>
                            <label>Pick From</label>
                            <input name="pickFrom" ref={register({ required: true })} />
                            {errors.pickFrom && <span>This field is required</span>}
                            <label>Pick To</label>
                            <input name="pickTo" ref={register({ required: true })} />
                            {errors.pickTo && <span>This field is required</span>}
                            <input type="submit" />
                        </form>
                        :
                        <div className='search-ride'>
                            <div className="search-result">
                                <h3><FontAwesomeIcon icon={faAngleDown} /> {searchRoute.pickFrom}</h3>
                                <h3><FontAwesomeIcon icon={faAngleUp} /> {searchRoute.pickTo}</h3>
                            </div>
                            <div className='ride-details'>
                                <img src={img} alt="" />
                                <p>{name}</p>
                                <p><FontAwesomeIcon icon={faUserFriends} /> {person}</p>
                                <p>${price}</p>
                            </div>
                            <div className='ride-details'>
                                <img src={img} alt="" />
                                <p>{name}</p>
                                <p><FontAwesomeIcon icon={faUserFriends} /> {person}</p>
                                <p>${price}</p>
                            </div>
                            <div className='ride-details'>
                                <img src={img} alt="" />
                                <p>{name}</p>
                                <p><FontAwesomeIcon icon={faUserFriends} /> {person}</p>
                                <p>${price}</p>
                            </div>
                        </div>
                    }
                </div>
                <div className="col-md-6 pt-3 map">
                    <GoogleMap></GoogleMap>
                </div>
            </div>
        </div>
    );
};

export default SearchRide;