import './App.css';
import Signin from './Components/signin';
import Singup from './Components/signup';
import Home from './Components/home'
import Room from './Components/rooms';
import ForgotPassword from './Components/forgotPassword';
import Book from './Components/book';
import ReserveSuccessful from './Components/reserveSuccessful';


import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route  path='/' element={<Signin/>}/>
        <Route path='/register' element={<Singup/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route  path='/home' element={<Home/>}/>
        <Route path='/room' element={<Room/>}/>
        <Route path='/book/:itemId' element={<Book/>}/>
        <Route path='/successful' element={<ReserveSuccessful/>}/>
        
      </Routes>
      
      
      </BrowserRouter>


    

    </div>
  );
}

export default App;
