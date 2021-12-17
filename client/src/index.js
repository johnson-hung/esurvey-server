import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App'

// Set up redux store which stores all the states
const store = createStore(()=> [], {}, applyMiddleware());

ReactDOM.render(
    <Provider store={store}><App /></Provider>, // Hook up provider and redux store
    document.querySelector('#root')
);
