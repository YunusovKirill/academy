import React, { useState } from 'react';
import styles from './UserForm.module.scss'

interface UserFormProps {
    onAddUser: (name: string, email: string) => void;
  }
  
  const UserForm: React.FC<UserFormProps> = ({ onAddUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onAddUser(name, email);
      setName('');
      setEmail('');
    };
  
    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.submitButton}>
          Добавить пользователя
        </button>
      </form>
    );
  };

export default UserForm;