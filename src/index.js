import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import App from './App';

import markupReducer from './Store/reducers/markupReducer';
import {createStore, compose, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";

import reportWebVitals from './reportWebVitals';
import authReducer from "./Store/reducers/authReducer";

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null
const composeEnhancers = devTools || compose;

const rootReducer = combineReducers({
    markup: markupReducer,
    auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware()))

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
