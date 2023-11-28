import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import storeReducer from './state'
import App from './App';
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {store: storeReducer}
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
   <App/>
  </Provider>
);

