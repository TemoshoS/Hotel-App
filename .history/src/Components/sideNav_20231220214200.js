// SideNav.js
import React from 'react';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader } from 'cdbreact';
import { NavLink } from 'react-router-dom';
import {
  FaBars,
  FaUser,
  FaChartBar,
  FaBook,
  FaCheckCircle,
  FaShoppingCart,
  FaSignOutAlt,
  FaMoneyBill,
} from 'react-icons/fa';

import AuthService from '../services/authService'; 
import {useNavigate } from 'react-router-dom';


function SideNav() {
  const navigation = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(AuthService.isLoggedIn());

  const signOut = async () => {
    const isOut = await AuthService.logout();

    if (isOut) {
      alert('Success');
      navigation('/sign');
      setIsLoggedIn(false);
    } else {
      
    }
  };
  return (
    
  );
}

export default SideNav;
