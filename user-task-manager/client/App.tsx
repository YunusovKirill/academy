import styles from './App.module.scss'

import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import UserManagement from './components/UserManagement/UserManagement';
import TaskManager from './components/TaskManager/TaskManager';
import Chat from './components/Chat/Chat';

const App = () => {
  return (
    <Router>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
        <li><NavLink to="/" className={({ isActive }) => isActive ? styles.active : ''}>Управление пользователями</NavLink></li>
          <li><NavLink to="/tasks" className={({ isActive }) => isActive ? styles.active : ''}>Управление задачами</NavLink></li>
          <li><NavLink to="/chat" className={({ isActive }) => isActive ? styles.active : ''}>Чат</NavLink></li>        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<UserManagement />}/>
        <Route path="/tasks" element={<TaskManager />}/>
        <Route path='/chat' element={<Chat />}/>
      </Routes>
    </Router>
  );
};

export default App;