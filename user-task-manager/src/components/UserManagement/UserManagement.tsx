import { useState } from 'react';
import { produce } from 'immer';
import styles from '../styles/UserManagement.module.scss';
import UserForm from './UserForm/UserForm';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (name: string, email: string) => {
    setUsers(produce(users, draft => {
      draft.push({
        id: Date.now(),
        name,
        email,
      });
    }));
  };

  const editUser = (id: number, name: string, email: string) => {
    setUsers(produce(users, draft => {
      const user = draft.find(user => user.id === id);
      if (user) {
        user.name = name;
        user.email = email;
      }
    }));
  };

  const removeUser = (id: number) => {
    setUsers(produce(users, draft => draft.filter(user => user.id !== id)));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Управление пользователями</h1>
      <UserForm onAddUser={addUser} />
      <ul className={styles.userList}>
        {users.map(user => (
          <li key={user.id} className={styles.userItem}>
            {user.name} ({user.email})
            <div>
              <button className={styles.button} onClick={() => editUser(user.id, 'new name', 'new email')}>Редактировать</button>
              <button className={styles.button} onClick={() => removeUser(user.id)}>Удалить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;