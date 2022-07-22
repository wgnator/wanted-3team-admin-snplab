import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApplyStatus from './pages/ApplyStatus';
import Registration from './pages/Registration';
import TestPage from './pages/TestPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/Application" element={<ApplyStatus />} />
      </Routes>
    </BrowserRouter>
  );
}
