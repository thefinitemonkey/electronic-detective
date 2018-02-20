import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';
//mport App from './js/App';
import GameManager from './js/GameManager';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter><GameManager /></BrowserRouter>, document.getElementById('root'));
//registerServiceWorker();
