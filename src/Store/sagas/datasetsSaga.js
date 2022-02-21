import { put, delay } from 'redux-saga/effects';

import * as actions from '../actions/rootAction';
import axios from '../../axios-instance';

export function* fetchAllDatasetsSaga() {
  yield put(actions.fetchDatasetsStart())
  try {
    const response = yield axios.get('/datasets/', {
      params: {
        limit: 1,
        offset: 0,
      },
    })
    const fullResponse = yield axios.get('/datasets/', {
      params: {
        limit: response.data.count,
        offset: 0,
      },
    })
    yield put(actions.fetchDatasetsSuccess(response.data.count, fullResponse.data.results))
  } catch (error) {
    yield put(actions.fetchDatasetsFail(error))
  }
}

export function* fetchDataSetsSaga(action) {
  yield put(actions.fetchDatasetsStart())
  try {
    const response = yield axios.get('/datasets/', {
      params: {
        limit: action.page.limit,
        offset: action.page.offset,
      },
    })
    yield put(actions.fetchDatasetsSuccess(response.data.count, response.data.results))
  } catch (error) {
    yield put(actions.fetchDatasetsFail(error))
  }
}

export function* addDataSetSaga(action) {
  const formData = yield new FormData()
  yield formData.append('name', action.name)
  yield formData.append('description', action.description)
  yield formData.append('dataset_to', action.file)
  try {
    yield axios.post('/datasets/', formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    yield put(actions.fetchDatasets(action.page))
  } catch (error) {
    yield put(actions.addDatasetFail(error.response.data))
    yield delay(3500)
    yield put(actions.cleanErrors())
  }
}

export function* deleteDataSetSaga(action) {
  try {
    yield axios.delete(`/datasets/${action.id}/`)
    yield put(actions.fetchDatasets(action.page))
  } catch (error) {
    console.log(error)
  }
}

export function* getDatasetInfoSaga(action) {
  try {
    const response = yield axios.get(`/datasets/${action.id}/`)
    yield put(actions.setCurrentDataset(response.data))
  } catch (error) {
    yield put(actions.getDatasetInfoFail(error))
  }
}

export function* uploadDatasetSaga(action) {
  let from = null
  let to = null
  if (action.imagesRange === null) {
    from = 0
    to = action.length
  } else {
    try {
      const response = yield axios.get(`/images-ranges/${action.imagesRange}/`)
      from = yield response.data.start
      to = yield response.data.end
    } catch (error) {
      console.log(error)
    }
  }
  try {
    const response = yield axios.get(`/datasets/${action.id}/download/`, {
      responseType: 'blob',
      params: {
        from,
        to,
      },
    })
    const data = yield response.data
    const url = yield window.URL.createObjectURL(data)
    const link = yield document.createElement('a')
    yield link.href = url
    link.setAttribute('download', `${action.name}.zip`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    console.log(error)
  }
}
