import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <div style={{height:'400px'}} className='w-100 d-flex justify-content-center'>
            <Spinner animation="border" variant="warning" />
        </div>
    );
};

export default Loading;