import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WatchLaterPage from './components/WatchLaterPage/WatchLaterPage';
import AnimeList from './components/AnimeList/AnimeList';
import AnimeDetailsPage from './components/AnimeDetailsPage/AnimeDetailsPage';

const App = () => {
  return (
    <Router>
    <h1>Anime List</h1>
    <Routes>
      <Route path="/" element={<AnimeList />} />
      <Route path="/watch-later" element={<WatchLaterPage />} />
      <Route path="/anime/:id" element={<AnimeDetailsPage />} />
    </Routes>
  </Router>
  )
};

export default App;