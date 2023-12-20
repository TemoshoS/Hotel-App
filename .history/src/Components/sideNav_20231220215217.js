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
  const [isLoggedIn, setIsLoggedIn] = React.useState(AuthService.getCurrentUser());

  const signOut = async () => {
    const isOut = await AuthService.logout();

    if (isOut) {
      alert('Admin logged out successfully');
      navigation('/sign');
      setIsLoggedIn(false);
    } else {
      
    }
  };
  return (
    <div className="sidenav-container">
      <CDBSidebar textColor="#333" backgroundColor="#ccc">
        <CDBSidebarHeader prefix={<FaBars size={24} />}>
          <NavLink to="/" className="brand-link">
            Hotel
          </NavLink>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          
        {isLoggedIn && (
            <>
            <NavLink to="/dashboard" className="sidebar-link" activeClassName="active">
            <FaChartBar /> Dashboard
            </NavLink>
              <NavLink to="/hotels" className="sidebar-link" activeClassName="active">
                <FaMoneyBill /> Hotels
              </NavLink>
              <NavLink to="/adminService" className="sidebar-link" activeClassName="active">
                <FaMoneyBill /> Services
              </NavLink>
              </>
          )}
              <NavLink to="/sign" className="sidebar-link" activeClassName="active" onClick={signOut}>
                <FaSignOutAlt /> Logout
              </NavLink>
           
        </CDBSidebarContent>

        <CDBSidebarFooter className="sidebar-footer">2023 @copyright</CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default SideNav;
