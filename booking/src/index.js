import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Создаем корневой элемент для рендеринга
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим приложение
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Если вы хотите начать измерять производительность вашего приложения, передайте функцию
// для логирования результатов (например: reportWebVitals(console.log))
// или отправки на аналитический сервер. Подробнее: https://bit.ly/CRA-vitals
reportWebVitals();