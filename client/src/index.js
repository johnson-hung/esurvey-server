// src/index.js - redux / data setup

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App'
import reducers from './reducers';

// Set up redux store which stores all the states
const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
    <Provider store={store}><App /></Provider>, // Hook up provider and redux store
    document.querySelector('#root')
);
