const ws = new WebSocket('ws://localhost:8080');

const statusDiv = document.querySelector('.status');
const messagesDiv = document.querySelector('.messages');
const usernameInput = document.querySelector('.username__input');
const passwordInput = document.querySelector('.password__input');
const messageInput = document.querySelector('.message__input');
const sendMessageButton = document.querySelector('.send__message__button');
const registerButton = document.querySelector('.register__button');
const loginButton = document.querySelector('.login__button');

let isAuthorized = false;

ws.onopen = () => {
    statusDiv.textContent = 'Подключено к WebSocket серверу';
};

ws.onclose = () => {
    statusDiv.textContent = 'Отключено от WebSocket сервера';
};

ws.onerror = (error) => {
    console.error('Ошибка WebSocket:', error);
};

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);

    switch (message.type) {
        case 'register':
            if (message.success) {
                alert('Регистрация прошла успешно');
            } else {
                alert(`Регистрация не удалась: ${message.error}`);
            }
            break;

        case 'auth':
            if (message.success) {
                alert('Авторизция прошла успешно');
                isAuthorized = true;
                messageInput.disabled = false;
                sendMessageButton.disabled = false;
            } else {
                alert('Авторизация не удалась');
            }
            break;

        case 'message':
            const newMessage = document.createElement('div');
            newMessage.textContent = `${message.sender}: ${message.message}`;
            messagesDiv.appendChild(newMessage);
            break;

        default:
            console.log('Неизвестная команда:', message);
    }
};

registerButton.onclick = () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    ws.send(JSON.stringify({
        type: 'register',
        username,
        password
    }));
};

loginButton.onclick = () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    ws.send(JSON.stringify({
        type: 'auth',
        username,
        password
    }));
};

sendMessageButton.onclick = () => {
    if (isAuthorized) {
        const message = messageInput.value;

        ws.send(JSON.stringify({
            type: 'message',
            message
        }));

        messageInput.value = '';
    }
};