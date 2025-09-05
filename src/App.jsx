import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './assets/Pages/MainPage';
import { IsScam } from './assets/Pages/IsScam';
import { ScamIs } from './assets/Pages/ScamIs';
import { Login } from './assets/pages/Login';
import { SignUp } from './assets/pages/SignUp';
import Layout from './layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/isscam" element={<IsScam />} />
          <Route path="/scamis" element={<ScamIs />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;