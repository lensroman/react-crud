import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import {authActionSaga} from './authSaga';
import {fetchDataSetsSaga} from './dataSetsSaga';

export function* watchAuthSaga() {
    yield takeEvery(actionTypes.AUTH_USER, authActionSaga)
}

export function* watchDataSetsSaga() {
    yield takeEvery(actionTypes.FETCH_DATASETS, fetchDataSetsSaga)
}