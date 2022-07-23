import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import ApplyStatus from './pages/ApplyStatus';
import Registration from './pages/Registration';
import TestPage from './pages/TestPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/applicants" element={<ApplyStatus />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
