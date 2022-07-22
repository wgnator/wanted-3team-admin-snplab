import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ApplyStatus from './pages/ApplyStatus';
import Registration from './pages/Registration';
import TestPage from './pages/TestPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<TestPage />} />
        <Route path="/Application" element={<ApplyStatus />} />
=======
        <Route path="/" element={<Registration />} />
        <Route path="/applicants" element={<ApplyStatus />} />
>>>>>>> 91228a3a0137ac654dfa0fc32b185a2c8f2ba42a
      </Routes>
    </BrowserRouter>
  );
}
