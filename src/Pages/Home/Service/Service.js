import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Servicec.css'

const Service = ({service}) => {
    const {id,name,img,price,description} = service;
    const navigate = useNavigate();

    const hendelServiceDetails = id => {
        navigate(`service/${id}`);
    }

    return (
        <div className='service w-100'>
            <h3>{name}</h3>
            <img className='w-100' src={img} alt="" />
            <p>price : {price}</p>
            <p><small>{description}</small></p>
            <button onClick={()=> hendelServiceDetails(id)} className='btn btn-primary'>Book : {name} </button>
        </div>
    );
};

export default Service;