import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-e2gievne3rpqcvkq.us.auth0.com"
      clientId="OZUL8DLiLvO2b2IvNVK5JVbrhlFGamME"
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <AppProvider>
        <App />
      </AppProvider>
    </Auth0Provider>
  </React.StrictMode>
);
