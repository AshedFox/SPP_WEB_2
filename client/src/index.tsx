import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './less/styles.css';
import {configure} from "mobx";

configure({
    enforceActions: "always"
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
