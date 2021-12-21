import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import App from './App';

import {BrowserRouter} from "react-router-dom";

import markupReducer from './Store/reducers/markupReducer';
import authReducer from "./Store/reducers/authReducer";
import {createStore, compose, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";

import reportWebVitals from './reportWebVitals';

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null
const composeEnhancers = devTools || compose;

const rootReducer = combineReducers({
    markup: markupReducer,
    auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware()))

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
