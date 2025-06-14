import AppLayout from './components/layout/AppLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Nova from './pages/Nova';
import Modelos from './pages/Modelos';
import Historico from './pages/Historico';
import Glossarios from './pages/Glossarios';
import PaginaTeste from './pages/PaginaTeste';

export default function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nova" element={<Nova />} />
          <Route path="/modelos" element={<Modelos />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/glossarios" element={<Glossarios />} />
          <Route path="/PaginaTeste" element={<PaginaTeste />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}
