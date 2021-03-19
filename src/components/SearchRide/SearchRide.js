import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import { FakeData } from '../../fakeData/FakeData';
import Map from '../../fakeData/images/Map.png'
import './SearchRide.css'

const SearchRide = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { id } = useParams();


    const [search, setSearch] = useState(false);
    const [searchRoute, setSearchRoute] = useState({})
    const [rideDetails, setRideDetails] = useState({});
    const {img, name, price, person} = rideDetails;

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        const riderId = FakeData.find(ride => ride.id === parseInt(id))
        setSearch(true)
        setRideDetails(riderId);
        setSearchRoute(data);
    };

    return (
        <div className="container row rideContain">
            <div className="col">
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
                            <h3>{searchRoute.pickFrom}</h3>
                            <h3>{searchRoute.pickTo}</h3>
                        </div>
                        <div className='ride-details'>
                            <img src={img} alt=""/>
                            <p>{name}</p>
                            <p>{person}</p>
                            <p>${price}</p>
                        </div>
                        <div className='ride-details'>
                            <img src={img} alt=""/>
                            <p>{name}</p>
                            <p>{person}</p>
                            <p>${price}</p>
                        </div>
                        <div className='ride-details'>
                            <img src={img} alt=""/>
                            <p>{name}</p>
                            <p>{person}</p>
                            <p>${price}</p>
                        </div>
                    </div>
                }
            </div>
            <div className="col map">
                <img src={Map} alt="" />
            </div>

        </div>
    );
};

export default SearchRide;