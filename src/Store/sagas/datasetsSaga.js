import { put } from 'redux-saga/effects';

import * as actions from '../actions/rootAction';
import axios from '../../axios-instance';

export function* fetchDatasetsSaga() {
    try {
        const response = yield axios.get('/datasets/')
        yield put(actions.fetchDatasetsSuccess(response))
    }
    catch(error) {
        yield put(actions.fetchDatasetsFail(error))
    }
}