import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import { Provider } from 'react-redux';
import storeReducer from './state'
import App from './App';
import { configureStore } from "@reduxjs/toolkit"
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const store = configureStore({
  reducer: {store: storeReducer},
  middleware: [thunk, logger]
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   <App/>
  </Provider>
);

