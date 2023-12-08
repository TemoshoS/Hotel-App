import './App.css';
import Signin from './Components/signin';
import Singup from './Components/signup';
import ForgotPassword from './Components/forgotPassword';
import Book from './Components/book';
import HomePage from './Components/homePage';
import Profile from './Components/profile';
import Services from './Components/services';


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
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/services' element={<Services/>}/>
        
        
      </Routes>
      
      
      </BrowserRouter>


    

    </div>
  );
}

export default App;
