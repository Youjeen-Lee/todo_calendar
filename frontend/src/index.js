/**
 * React 애플리케이션의 진입점(entry point)
 * App.js를 렌더링하고 React 애플리케이션을 시작하는 역할
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

