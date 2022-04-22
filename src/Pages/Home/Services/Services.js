import React, { useEffect, useState } from 'react';
import Title from '../../Shared/TitleChaged/Title';
import Service from '../Service/Service';
import './Services.css'

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('services.json')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])

    return (
        <div>
            <Title title={"services"}></Title>
            <h1 className='text-primary mt-5 mb-3' id='srvices'>Our services Center</h1>
            <div className='service-caontainer container'>
                {
                    services.map(service => <Service key={service.id} service={service}></Service>)
                }
            </div>
        </div>
    );
};

export default Services;