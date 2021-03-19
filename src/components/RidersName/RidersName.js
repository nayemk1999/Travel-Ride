import React from 'react';
import './RidersName.css'

const RidersName = (props) => {
    const {name, img} = props.rider
    console.log(props);
    return (
        <div className='col-md-3 mt-5 col-sm-12 riders'>
            <div className='card card-div' >
                <img src={img} alt="Rider Logo" />
                <div className='card-body bg-light' >
                    <h4 className='card-text'>{name}</h4>
                </div>
            </div>
        </div>
    );
};

export default RidersName;