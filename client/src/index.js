// src/index.js - redux / data setup

import 'materialize-css/dist/css/materialize.min.css'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App'
import reducers from './reducers';

// For development and testing
import axios from 'axios';
window.axios = axios;

// Set up redux store which stores all the states
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>, // Hook up provider and redux store
    document.querySelector('#root')
);
