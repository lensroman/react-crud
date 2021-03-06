import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import { BrowserRouter } from 'react-router-dom';

import {
  createStore, compose, combineReducers, applyMiddleware,
} from 'redux';
import { Provider } from 'react-redux';

import createSagaMiddleware from 'redux-saga';
import App from './App';
import {
  watchAdminTasksSaga, watchAuthSaga, watchCommentsSaga, watchDataSetsSaga, watchUsersSaga,
} from './Store/sagas/rootSaga'

import markupReducer from './Store/reducers/markupReducer';
import authReducer from './Store/reducers/authReducer';
import datasetsReducer from './Store/reducers/datasetsReducer';
import tasksReducer from './Store/reducers/tasksReducer';
import commentsReducer from './Store/reducers/commentsReducer';
import usersReducer from './Store/reducers/usersReducer'

import reportWebVitals from './reportWebVitals';

const devTools = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null
const composeEnhancers = devTools || compose;

const sagaMiddleWare = createSagaMiddleware()

const rootReducer = combineReducers({
  markup: markupReducer,
  auth: authReducer,
  datasets: datasetsReducer,
  tasks: tasksReducer,
  comments: commentsReducer,
  users: usersReducer,
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleWare)))

sagaMiddleWare.run(watchAuthSaga)
sagaMiddleWare.run(watchDataSetsSaga)
sagaMiddleWare.run(watchAdminTasksSaga)
sagaMiddleWare.run(watchCommentsSaga)
sagaMiddleWare.run(watchUsersSaga)

const app = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
