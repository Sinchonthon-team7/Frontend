import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import IsScam from './pages/IsScam';
import IsScamDetail from './pages/IsScamDetail';
import IsScamWrite from './pages/IsScamWrite';
import ScamIs from './pages/ScamIs';
import ScamIsDetail from './pages/ScamIsDetail';
import ScamIsWrite from './pages/ScamIsWrite';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Layout from './layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/isscam" element={<IsScam />} />
          <Route path="/isscam/write" element={<IsScamWrite />} />
          <Route path="/isscam/:id" element={<IsScamDetail />} />
          <Route path="/scamis" element={<ScamIs />} />
          <Route path="/scamis/write" element={<ScamIsWrite />} />
          <Route path="/scamis/:id" element={<ScamIsDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;