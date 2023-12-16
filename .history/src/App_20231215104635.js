// App.js
import React, { createContext, useContext, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import SideNav from './Components/sideNav'; 
import Signin from './Components/signin';
import Signup from './Components/signup';
import ForgotPassword from './Components/forgotPassword';
import Book from './Components/book';
import HomePage from './Components/homePage';
import Profile from './Components/profile';
import Services from './Components/services';
import Bookings from './Components/admin/bookings';
import Dashboard from './Components/admin/dashboard';
import Hotels from './Components/admin/hotels';

// Create a context to manage user role
const UserContext = createContext();

function App() {
  const [userRole, setUserRole] = useState('user'); // Default role is 'user'

  // Function to set user role as 'admin'
  const setAdminRole = () => setUserRole('admin');

  return (
    <Router>
      <UserContext.Provider value={{ userRole, setAdminRole }}>
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
          {userRole === 'admin' && <SideNav />}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <Routes>
              <Route path="/homePage" element={<HomePage />} />
              <Route path="/sigdn" element={<Signin />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/book/:itemId" element={<Book />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/services" element={<Services />} />

              <Route path="/" element={<Signin  />}>
                {userRole === 'admin' ? (
                  <>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/hotels" element={<Hotels />} />
                  </>
                ) : (
                  <Navigate to="/homePage" />
                )}
              </Route>
            </Routes>
          </div>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

// Function component to set the user role as 'admin'
function AdminLogin() {
  const { setAdminRole } = useContext(UserContext);
  setAdminRole();
  return <Navigate to="/dashboard" />;
}

export default App;
export { AdminLogin };
