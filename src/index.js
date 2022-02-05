import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './index.scss';
import App from './App';

import { BrowserRouter } from "react-router-dom";

import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import createSagaMiddleware from 'redux-saga';
import {watchAdminTasksSaga, watchAuthSaga, watchCommentsSaga, watchDataSetsSaga} from "./Store/sagas/rootSaga";

import markupReducer from './Store/reducers/markupReducer';
import authReducer from "./Store/reducers/authReducer";
import datasetsReducer from './Store/reducers/datasetsReducer';
import tasksReducer from './Store/reducers/tasksReducer';
import commentsReducer from './Store/reducers/commentsReducer';

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null
const composeEnhancers = devTools || compose;

const sagaMiddleWare = createSagaMiddleware()

const rootReducer = combineReducers({
    markup: markupReducer,
    auth: authReducer,
    datasets: datasetsReducer,
    tasks: tasksReducer,
    comments: commentsReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleWare)))

sagaMiddleWare.run(watchAuthSaga)
sagaMiddleWare.run(watchDataSetsSaga)
sagaMiddleWare.run(watchAdminTasksSaga)
sagaMiddleWare.run(watchCommentsSaga)

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
