import './App.css'

import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Menu from './components/Menu/Menu';
import Tasks from './components/Menu/Tasks/Tasks';
import Settings from './components/Menu/Settings/Settings';
import Accounting from './components/Menu/Tasks/Accounting/Accounting';
import List from './components/Menu/Tasks/Accounting/List/List';

function App() {
  return (
    <div className='wrapper'>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App