import { put } from 'redux-saga/effects';

import * as actions from '../actions/rootAction';
import axios from '../../axios-instance';

export function* fetchDataSetsSaga() {
    yield put(actions.fetchDatasetsStart())
    try {
        const response = yield axios.get('/datasets/')
        yield put(actions.fetchDatasetsSuccess(response.data.results))
    }
    catch(error) {
        yield put(actions.fetchDatasetsFail(error))
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
        yield put(actions.fetchDatasets())
    }
    catch(error) {
        console.log(error)
    }
}

export function* deleteDataSetSaga(action) {
    try {
        yield axios.delete(`/datasets/${action.id}/`)
        yield put(actions.fetchDatasets())
    }
    catch(error) {
        console.log(error)
    }
}

export function* getDatasetInfoSaga(action) {
    try {
        const response = yield axios.get(`/datasets/${action.id}/`)
        yield put(actions.setCurrentDataset(response.data))
    }
    catch(error) {
        console.log(error)
    }
}

export function* uploadDatasetSaga(action) {
    try {
        const response = yield axios.get(`/datasets/${action.id}/download/`, {
            responseType: 'blob'
        })
        let data = yield response.data
        let url = yield window.URL.createObjectURL(data)
        let link = yield document.createElement('a')
        yield link.href = url
        link.setAttribute('download', `${action.name}.zip`)
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
    catch(error) {
        console.log(error)
    }
}