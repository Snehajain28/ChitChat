import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { NewContextProvider } from './Utils/Provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NewContextProvider>
    <BrowserRouter>
      <App>
  
      </App>
    </BrowserRouter>
  </NewContextProvider>

);
