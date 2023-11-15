import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
    <React.StrictMode>
        <App/>

    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
