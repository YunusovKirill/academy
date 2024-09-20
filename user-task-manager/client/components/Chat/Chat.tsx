import React, { useEffect, useState } from 'react';
import styles from './chat.module.scss';

interface Message {
  sender: string;
  message: string;
}

interface WSMessage {
  type: string;
  success?: boolean;
  error?: string;
  sender?: string;
  message?: string;
}

const Chat: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [status, setStatus] = useState('Соединение...');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    
    setWs(socket);

    socket.onopen = () => {
      setStatus('Подключено к WebSocket серверу');
    };

    socket.onerror = (error) => {
      console.error('Ошибка WebSocket:', error);
    };

    socket.onmessage = (event) => {
      const data: WSMessage = JSON.parse(event.data);
      handleServerMessage(data);
    };
  }, []);

  const handleServerMessage = (message: WSMessage) => {
    switch (message.type) {
      case 'register':
        if (message.success) {
          setStatus('Регистрация прошла успешно');
        } else {
          setStatus(`Регистрация не удалась: ${message.error}`);
        }
        break;
      case 'auth':
        if (message.success) {
          setIsAuthorized(true);
          setStatus('Авторизация успешна');
        } else {
          setStatus('Авторизация не удалась');
        }
        break;
      case 'message':
        if (message.sender && message.message) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: message.sender ?? 'Неизвестный пользователь', message: message.message ?? '' },
          ]);
        }
        break;
    }
  };

  const register = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: 'register',
          username,
          password,
        })
      );
    }
  };

  const login = () => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: 'auth',
          username,
          password,
        })
      );
    }
  };

  const sendMessage = () => {
    if (isAuthorized && ws) {
      ws.send(
        JSON.stringify({
          type: 'message',
          message,
        })
      );
      setMessage('');
    }
  };

  return (
    <div className={styles.chat}>
      <h1 className={styles.chat__title}>Чат WebSocket</h1>
      <div className={styles.chat__status}>{status}</div>
      <div className={styles.chat__controls}>
        <input
          type="text"
          placeholder="Ваше имя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={register}>
          Регистрация
        </button>
        <button onClick={login}>
          Вход
        </button>
      </div>
      <div className={styles.chat__messages}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            {msg.sender}: {msg.message}
          </div>
        ))}
      </div>
      <div className={styles.chat__input__area}>
        <input
          type="text"
          placeholder="Напишите сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!isAuthorized}
        />
        <button
          onClick={sendMessage}
          disabled={!isAuthorized}
        >Отправить</button>
      </div>
    </div>
  );
};

export default Chat;