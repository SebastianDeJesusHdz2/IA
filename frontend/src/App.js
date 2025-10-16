import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Dashboard from '@/pages/Dashboard';
import WorkDetail from '@/pages/WorkDetail';
import CharacterProfile from '@/pages/CharacterProfile';

function App() {
  return (
    <div className="App min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/works/:workId" element={<WorkDetail />} />
          <Route path="/works/:workId/characters/:characterId" element={<CharacterProfile />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;