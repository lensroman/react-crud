import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './index.scss';
import App from './App';

import {BrowserRouter} from "react-router-dom";

import {createStore, compose, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";

import createSagaMiddleware from 'redux-saga';
import {watchAuthSaga, watchDatasetsSaga} from "./Store/sagas/rootSaga";

import markupReducer from './Store/reducers/markupReducer';
import authReducer from "./Store/reducers/authReducer";
import datasetsReducer from './Store/reducers/datasetsReducer';

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null
const composeEnhancers = devTools || compose;

const sagaMiddleWare = createSagaMiddleware()

const rootReducer = combineReducers({
    markup: markupReducer,
    auth: authReducer,
    datasets: datasetsReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleWare)))

sagaMiddleWare.run(watchAuthSaga)
sagaMiddleWare.run(watchDatasetsSaga)

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
