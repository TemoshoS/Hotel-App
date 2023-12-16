// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
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

function MainContent() {
  return (
    <div style={{ flex: 1, overflowY: 'auto' }}>
      <Routes>
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/sign" element={<Signin />} />
        <Route path="/register" element={<Singup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/book/:itemId" element={<Book />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </div>
  );
}

function AdminContent() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/hotels" element={<Hotels />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <SideNav />
        <Outlet />
      </div>
    </Router>
  );
}

export default App;
