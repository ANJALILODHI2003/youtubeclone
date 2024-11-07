import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css'
import './_base.scss';
import store from './redux/store';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Create a root

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
