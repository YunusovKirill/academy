import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WatchLaterPage from './components/WatchLaterPage/WatchLaterPage';
import AnimeList from './components/AnimeList/AnimeList';
import styles from './app.module.scss'

const App = () => {
  return (
    <Router>
    <div className={styles.app}>
    <Routes>
      <Route path="/" element={<AnimeList />} />
      <Route path="/watch-later" element={<WatchLaterPage />} />
    </Routes>
    </div>
  </Router>
  )
};

export default App;