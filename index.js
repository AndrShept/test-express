const express = require('express'); // Імпортуємо Express
const http = require('http'); // Імпортуємо модуль HTTP
const socketIo = require('socket.io'); // Імпортуємо Socket.IO

const app = express(); // Створюємо інстанцію додатку Express

const server = http.createServer(app); // Створюємо HTTP сервер
const io = socketIo(server); // Ініціалізуємо Socket.IO на нашому сервері

// Налаштовуємо маршрут для домашньої сторінки
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Налаштовуємо обробку підключення Socket.IO
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// Запускаємо сервер на порту 3000
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('GO GOGOGOGO');
});
