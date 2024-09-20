import { useState } from 'react';
import { produce } from 'immer';
import styles from './UserManagement.module.scss';
import UserForm from './UserForm/UserForm';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState<string>('');
  const [editedEmail, setEditedEmail] = useState<string>('');

  const addUser = (name: string, email: string) => {
    setUsers(produce(users, draft => {
      draft.push({
        id: Date.now(),
        name,
        email,
      });
    }));
  };

  const editUser = (id: number) => {
    const user = users.find(user => user.id === id);
    if (user) {
      if (editUserId === id) {
        setUsers(produce(users, draft => {
          const editingUser = draft.find(u => u.id === id);
          if (editingUser) {
            editingUser.name = editedName;
            editingUser.email = editedEmail;
          }
        }));
        setEditUserId(null);
      } else {
        setEditUserId(id);
        setEditedName(user.name);
        setEditedEmail(user.email);
      }
    }
  };

  const removeUser = (id: number) => {
    setUsers(produce(users, draft => draft.filter(user => user.id !== id)));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Управление пользователями</h1>
      <UserForm onAddUser={addUser} />
      <ul className={styles.user__list}>
        {users.map(user => (
          <li key={user.id} className={styles.user__list__item}>
            {editUserId === user.id ? (
              <>
                <div>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Введите новое имя"
                  />
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    placeholder="Введите новый email"
                  />
                </div>
                <button className={styles.button} onClick={() => editUser(user.id)}>Сохранить</button>
              </>
            ) : (
              <div className={styles.user__list__item__done}>
                <div className="">{user.name} ({user.email})</div>
                <div>
                  <button className={styles.button} onClick={() => editUser(user.id)}>Редактировать</button>
                  <button className={styles.button} onClick={() => removeUser(user.id)}>Удалить</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;