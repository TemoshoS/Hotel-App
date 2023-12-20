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

function App() {
  return (
    // <Router>
    //       <Routes>
    //         <Route path="/homePage" element={<HomePage />} />
    //         <Route path="/" element={<Signin />} />
    //         <Route path="/register" element={<Singup />} />
    //         <Route path="/forgotpassword" element={<ForgotPassword />} />
    //         <Route path="/book/:itemId" element={<Book />} />
    //         <Route path="/profile" element={<Profile />} />
    //         <Route path="/services" element={<Services />} />
    //       </Routes>
    // </Router>

    <Router>
<div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
  <SideNav />
  <div style={{ flex: 1, overflowY: 'auto' }}>
    <Routes>
      
      
      
    
      <Route path="/" element={<Signin />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/hotels" element={<Hotels />} /> 
      </Route>
    </Routes>
  </div>
</div>
</Router>


  );
}

export default App;
