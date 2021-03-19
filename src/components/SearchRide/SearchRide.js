import React, { useState } from 'react';
import Map from '../../fakeData/images/Map.png'
import './SearchRide.css'

const SearchRide = () => {
    const [search, setSearch] = useState(false)
    return (
        <div className="container row">
            <div className="col">
                {
                    !search ? <div className='search-ride'>
                        <label>Pick From</label>
                        <input type="text" name="pickFrom" id="" />
                        <label>Pick To</label>
                        <input type="text" name="pickTo" id="" />
                        <button onClick={() => setSearch(!search)}>Search</button>
                    </div>
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