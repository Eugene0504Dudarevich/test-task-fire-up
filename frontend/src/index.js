import React from 'react';
import ReactDOM from 'react-dom';
import './config/bootstrap';
import App from './containers/App';
import { Provider } from 'mobx-react';
import './index.css';
import stores from './stores';

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
