import { put } from 'redux-saga/effects';

import * as actions from '../actions/rootAction';
import axios from '../../axios-instance';

export function* fetchDataSetsSaga() {
    yield put(actions.fetchDataSetsStart())
    try {
        const response = yield axios.get('/datasets/')
        yield put(actions.fetchDataSetsSuccess(response))
    }
    catch(error) {
        yield put(actions.fetchDataSetsFail(error))
    }
}