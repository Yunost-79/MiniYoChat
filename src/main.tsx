import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.tsx';

import App from './App.tsx';

import './main.scss';
import { ChatContextProvider } from './context/ChatContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <ChatContextProvider>
      <BrowserRouter basename="/miniYoChat/">
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ChatContextProvider>
  </AuthContextProvider>
);
