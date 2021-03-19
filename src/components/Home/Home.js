import React from 'react';
import { FakeData } from '../../fakeData/FakeData';

import RidersName from '../RidersName/RidersName';
import './Home.css'

const Home = () => {
    return (
        <div className="container home ">
            <h3 className="text-center">Welcome To Travel Ride</h3>
            <h1 className="text-center">You can take a ride of your choice..</h1>
            <div className="row">
                {
                    FakeData.map(rider => <RidersName rider={rider} key={rider.id}></RidersName>)
                }
            </div>

        </div>
    );
};

export default Home;