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
  const naviagation = useNavigate();
  const signOut = async()=>{
    const isOut = await AuthService.logout();

    if (isOut) {
      alert('suces');
      naviagation('/sign');
      
    } else {
      
    }
  }
  return (
    <div className="sidenav-container">
      <CDBSidebar textColor="#fff" backgroundColor="#191970" >
        <CDBSidebarHeader prefix={<FaBars size={24} />}>
          <NavLink to="/" className="brand-link">
            Hotel
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <NavLink to="/dashboard" className="sidebar-link" activeClassName="active">
            <FaChartBar /> Dashboard
          </NavLink>
          <NavLink to="/hotels" className="sidebar-link" activeClassName="active">
            <FaMoneyBill /> Hotels
          </NavLink>
          <NavLink to="/bookings" className="sidebar-link" activeClassName="active">
            <FaCheckCircle /> bookings
          </NavLink>
          <NavLink to="/sign" className="sidebar-link" activeClassName="active">
            <FaSignOutAlt /> Logout
          </NavLink>
        </CDBSidebarContent>

        <CDBSidebarFooter className="sidebar-footer">
         
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default SideNav;
