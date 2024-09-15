import styles from './App.module.scss'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import UserManagement from './components/UserManagement/UserManagement';
import TaskManager from './components/TaskManager/TaskManager'; // Допустим, этот компонент тоже есть

// Пример простого меню навигации
const App = () => {
  return (
    <Router>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          <li><Link to="/">Управление пользователями</Link></li>
          <li><Link to="/tasks">Управление задачами</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<UserManagement />}/>
        <Route path="/tasks" element={<TaskManager />}/>
      </Routes>
    </Router>
  );
};

export default App;