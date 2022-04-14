import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ServiceDetails = () => {
    const {serviceId} = useParams();
    return (
        <div>
            <h3>this is service details : {serviceId}</h3>
            <div className='btn btn-primary text-center'>
                <Link to='/chackout' className='text-white text-decoration-none'>Proceed to chackout</Link>
            </div>
        </div>
    );
};

export default ServiceDetails;