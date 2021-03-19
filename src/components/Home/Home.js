import React from 'react';
import { FakeData } from '../../fakeData/FakeData';

import RidersName from '../RidersName/RidersName';
import './Home.css'

const Home = () => {
    return (
        <div className="container home row">
            {
                FakeData.map(rider => <RidersName rider ={rider}></RidersName>)
            }   
        </div>
    );
};

export default Home;