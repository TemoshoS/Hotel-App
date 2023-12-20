import React, { useEffect, useState } from 'react';
import { getServices } from '../../services/serviceServices';

function AdminService() {
    const [services, setServices] = useState([]);

    useEffect(() => {


        fetchCurrentUser();
    
        fetchRoomsData();
    
        fetchServicesData();
    
      }, []);
  return (
    <div>adminService</div>
  )
}

export default AdminService