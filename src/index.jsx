import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

import App from 'App';
import ScrollToTop from 'components/ScrollToTop';

import rootSagas from 'redux/rootSagas';
import store, { sagaMiddleware } from 'redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

sagaMiddleware(rootSagas);

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

root.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>
  </Web3ReactProvider>,
);
