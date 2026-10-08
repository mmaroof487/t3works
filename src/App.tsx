import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import CandidatePortal from './pages/CandidatePortal';
import EnterprisePortal from './pages/EnterprisePortal';
import RadixPage from './pages/RadixPage';
import LeadershipPage from './pages/LeadershipPage';
import { RADIX_COMPANY, RADIX_STUDENT } from './data/radix';
import Preloader from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <Preloader
          onComplete={() => {
            setIsLoading(false);
          }}
        />
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="apply" element={<RadixPage content={RADIX_STUDENT} />} />
            <Route path="apply/form" element={<CandidatePortal />} />
            <Route path="hire" element={<RadixPage content={RADIX_COMPANY} />} />
            <Route path="hire/form" element={<EnterprisePortal />} />
            <Route path="radix" element={<RadixPage />} />
            <Route path="leadership" element={<LeadershipPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
