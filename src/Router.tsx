import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApplyStatus from './pages/ApplyStatus';
import Registration from './pages/Registration';
import Render from './pages/Render';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Render />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/applicants" element={<ApplyStatus />} />
      </Routes>
    </BrowserRouter>
  );
}
