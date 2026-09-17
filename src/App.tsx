import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import CandidatePortal from './pages/CandidatePortal';
import EnterprisePortal from './pages/EnterprisePortal';
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
            <Route path="apply" element={<CandidatePortal />} />
            <Route path="hire" element={<EnterprisePortal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
