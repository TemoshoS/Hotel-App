
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import SideNav from './Components/sideNav'; 
import Signin from './Components/signin';
import Singup from './Components/signup';
import ForgotPassword from './Components/forgotPassword';
import Book from './Components/book';
import HomePage from './Components/homePage';
import Profile from './Components/profile';
import Services from './Components/services';
import Bookings from './Components/admin/bookings';
import Dashboard from './Components/admin/dashboard';
import Hotels from './Components/admin/hotels';
import AdminService from './Components/admin/adminService';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <SideNav />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Routes>
            {/* Redirect to Signin when the root URL is accessed */}
            <Route
              path="/"
              element={<Navigate to="/sign" />}
            />
            <Route path="/sign" element={<Signin />} />
            <Route path="/register" element={<Singup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            
            <Route path="/profile" element={<Profile />} />
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/hotels" element={<Hotels />} /> 
            <Route path="/adminService" element={<AdminService />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
