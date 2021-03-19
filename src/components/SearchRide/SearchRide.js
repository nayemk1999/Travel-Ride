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

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        const riderId = FakeData.find(ride => ride.id === parseInt(id))
        setSearch(true)
    };

    return (
        <div className="container row">
            <div className="col">
                <p>Id Number: {id}</p>
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
                            <h3>Pick From</h3>
                            <h3>Pick From</h3>
                        </div>
                        <h3>Line Number-01</h3>
                        <h3>Line Number-02</h3>
                        <h3>Line Number-02</h3>
                    </div>
                }
            </div>
            <div className="col">
                <img src={Map} alt="" />
            </div>

        </div>
    );
};

export default SearchRide;