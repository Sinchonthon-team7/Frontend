import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './assets/Pages/MainPage';
import { ScamIs } from './assets/Pages/ScamIs';
import { IsScam } from './assets/Pages/IsScam';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/isscam' element={<IsScam/>}/>
        <Route path='/scamis' element={<ScamIs/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;