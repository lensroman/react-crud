import { put } from 'redux-saga/effects';

import * as actions from '../actions/rootAction';
import axios from '../../axios-instance';

export function* fetchDataSetsSaga() {
    yield put(actions.fetchDataSetsStart())
    try {
        const response = yield axios.get('/datasets/')
        yield put(actions.fetchDataSetsSuccess(response.data.results))
    }
    catch(error) {
        yield put(actions.fetchDataSetsFail(error))
    }
}

export function* addDataSetSaga(action) {
    const formData = yield new FormData()
    yield formData.append('name', action.name)
    yield formData.append('dataset_to', action.file)
    try {
        yield axios.post('/datasets/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        yield put(actions.fetchDataSets())
    }
    catch(error) {
        console.log(error)
    }
}

export function* deleteDataSetSaga(action) {
    console.log(typeof action.id)
    try {
        yield axios.delete(`/datasets/${action.id}/`)
        yield put(actions.fetchDataSets())
    }
    catch(error) {
        console.log(error)
    }
}