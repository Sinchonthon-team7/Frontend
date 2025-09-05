import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import IsScam from './pages/IsScam';
import { ScamIs } from './pages/ScamIs';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import Layout from './layout/Layout';
import IsScamWrite from './pages/IsScamWrite';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/isscam" element={<IsScam />} />
          <Route path="/isscam/write" element={<IsScamWrite />} />
          <Route path="/scamis" element={<ScamIs />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;