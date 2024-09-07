import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import MainMenu from './components/Menu/MenuNav/MainMenu/MainMenu';
import Tasks from './components/Menu/MenuNav/Tasks/Tasks';
import Settings from './components/Menu/MenuNav/Settings/Settings';
import Accounting from './components/Menu/MenuNav/Tasks/Accounting/Accounting';
import List from './components/Menu/MenuNav/Tasks/Accounting/List/List';

function App() {
  return (
    <div className='wrapper'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/list" element={<List />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App