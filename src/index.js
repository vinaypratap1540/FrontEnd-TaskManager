import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import { Provider } from 'react-redux';
import { appStore } from './app/store.js';
import {ToastContainer} from "react-toastify"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={appStore}>
    <App/>
    <ToastContainer
           position="bottom-right"
           autoClose={2000}
           hideProgressBar={true}
           newestOnTop={true}
           closeOnClick
           pauseOnHover
           draggable
           closeButton={false}
     />
  </Provider>
  </React.StrictMode>
);
