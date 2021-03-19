
import { Link } from 'react-router-dom';

import './RidersName.css'

const RidersName = (props) => {
    const { name, img ,id} = props.rider

    return (
        <div className='col-md-3 mt-5 col-sm-12 riders'>
            <Link to={"/search-ride/" + id}>
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