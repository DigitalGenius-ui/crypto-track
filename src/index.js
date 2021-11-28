import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CryptoProvider } from './context/Context.config';
import 'react-alice-carousel/lib/alice-carousel.css';

ReactDOM.render(
  <React.StrictMode>
    <CryptoProvider>
      <App />
    </CryptoProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

