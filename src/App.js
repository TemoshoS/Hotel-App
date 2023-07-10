import './App.css';
import Signin from './Components/signin';
import Singup from './Components/signup';
import Home from './Components/home'


import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route  path='/' element={<Signin/>}/>
        <Route path='/register' element={<Singup/>}/>
        <Route  path='/home' element={<Home/>}/>
      </Routes>
      
      
      </BrowserRouter>


    

    </div>
  );
}

export default App;
