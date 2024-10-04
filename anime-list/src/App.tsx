import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import WatchLaterPage from './components/WatchLaterPage/WatchLaterPage';
import AnimeDetailsLoader from './components/AnimeDetailsLoader/AnimeDetailsLoader';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/watch-later" element={<WatchLaterPage />} />
      <Route path="/anime/:id" element={<AnimeDetailsLoader />} />
    </Routes>
  </Router>
);

export default App;