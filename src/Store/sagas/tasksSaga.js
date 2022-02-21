import { put, delay } from 'redux-saga/effects';

import * as actions from '../actions/rootAction';
import axios from '../../axios-instance';

export function* fetchAdminTasksSaga(action) {
  try {
    const response = yield axios.get('/tasks/', {
      params: {
        status: action.tasksType,
        limit: action.page.limit,
        offset: action.page.offset,
      },
    })
    yield put(actions.fetchAdminTasksSuccess(response.data.count, response.data.results, action.tasksType))
  } catch (error) {
    yield put(actions.fetchAdminTasksFail(error))
    yield delay(3500)
    yield put(actions.cleanErrors())
  }
}

export function* addAdminTaskSaga(action) {
  try {
    yield axios.post('/tasks/', {
      dataset: action.task.dataset,
      marker: action.task.marker,
      title: action.task.title,
      images_count: action.task.imagesCount,
      description: action.task.description,
    })
    yield put(actions.fetchAdminTasks('opened', action.page))
  } catch (error) {
    yield put(actions.addAdminTaskFail(error.response.data))
    yield delay(3500)
    yield put(actions.cleanErrors())
  }
}

export function* deleteAdminTaskSaga(action) {
  try {
    yield axios.delete(`/tasks/${action.id}/`)
    yield put(actions.fetchAdminTasks(action.status, action.page))
  } catch (error) {
    console.log(error)
  }
}

export function* getTaskInfoSaga(action) {
  try {
    const response = yield axios.get(`/tasks/${action.id}/`)
    yield put(actions.setCurrentTask(response.data))
  } catch (error) {
    console.log(error)
  }
}

export function* competeTaskSaga(action) {
  try {
    const formData = new FormData()
    formData.append('task', action.data.task)
    formData.append('new_dataset', action.data.file)
    yield axios.post(`/tasks/${action.data.task.id}/done/`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    const userId = yield localStorage.getItem('id')
    yield put(actions.getTaskInfo(action.data.task.id))
    yield put(actions.addComment('Задача отправлена на подтверждение администратору.', action.data.task.id, userId))
    if (action.comment !== '') {
      yield put(actions.addComment(action.comment, action.data.task.id, userId))
    }
  } catch (error) {
    yield put(actions.completeTaskFail(error.response.data))
    yield delay(3500)
    yield put(actions.cleanErrors())
  }
}

export function* closeTaskSaga(action) {
  try {
    yield axios.post(`/tasks/${action.id}/close/`)
    yield put(actions.closeTaskSuccess({
      message: 'Задача успешно закрыта',
    }))
    yield put(actions.getTaskInfo(action.id))
    yield delay(3500)
    yield put(actions.cleanErrors())
  } catch (error) {
    yield put(actions.closeTaskFail(error))
    yield delay(3500)
    yield put(actions.cleanErrors())
  }
}

export function* openTaskSaga(action) {
  try {
    yield axios.post(`/tasks/${action.id}/open/`)
    yield put(actions.openTaskSuccess({
      message: 'Задача снова открыта',
    }))
    yield put(actions.getTaskInfo(action.id))
    yield delay(3500)
    yield put(actions.cleanErrors())
  } catch (error) {
    yield put(actions.openTaskFail(error))
    yield delay(3500)
    yield put(actions.cleanErrors())
  }
}
