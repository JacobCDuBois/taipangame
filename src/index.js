import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PhaserGame from './taipan'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <PhaserGame />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
