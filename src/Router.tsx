import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ApplyStatus from './pages/ApplyStatus';
import Registration from './pages/Registration';
import Render from './pages/Render';
import TestPage from './pages/TestPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Render />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/applicants" element={<ApplyStatus />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
