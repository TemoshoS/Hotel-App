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
import { IoMdTime } from 'react-icons/io';


function SideNav() {
  return (
    <div className="sidenav-container">
      <CDBSidebar textColor="#333" backgroundColor="#ccc">
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
          <NavLink to="/logout" className="sidebar-link" activeClassName="active">
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
