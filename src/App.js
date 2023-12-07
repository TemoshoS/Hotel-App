import './App.css';
import Signin from './Components/signin';
import Singup from './Components/signup';
import Home from './Components/home'
import Room from './Components/rooms';
import ForgotPassword from './Components/forgotPassword';
import Book from './Components/book';
import ReserveSuccessful from './Components/reserveSuccessful';
import HomePage from './Components/homePage';



import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route  path='/' element={<HomePage/>}/>
        <Route  path='/sign' element={<Signin/>}/>
        <Route path='/register' element={<Singup/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/book/:itemId' element={<Book/>}/>
        <Route path='/successful' element={<ReserveSuccessful/>}/>
        
        
      </Routes>
      
      
      </BrowserRouter>


    

    </div>
  );
}

export default App;
