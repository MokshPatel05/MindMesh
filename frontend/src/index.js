import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Suppress benign ResizeObserver error (common with MUI, doesn't affect functionality)
const originalOnError = window.onerror;
window.onerror = function (msg, ...args) {
    if (typeof msg === 'string' && msg.includes('ResizeObserver loop')) return true;
    return originalOnError ? originalOnError.apply(this, [msg, ...args]) : false;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
