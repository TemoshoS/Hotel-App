import React, { useEffect, useState } from 'react';
import { getServices} from '../services/serviceServices'

function Services() {
  const [services, setServices] = useState([]);

  useEffect(()=>{
    const fetchServices = async()={
      try {
        const servicesData = await getServices()
      } catch (error) {
        
      }
    }

  },[]);

  return (
    <div>services</div>
  )
}

export default Services