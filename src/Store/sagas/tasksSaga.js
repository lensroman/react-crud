import { put } from 'redux-saga/effects';

import * as actions from '../actions/rootAction';
import axios from '../../axios-instance';

export function* fetchAdminTasksSaga(action) {
    if (action.tasksType === true) {
        try {
            const response = yield axios.get('/tasks/')
            yield put(actions.fetchAdminTasksSuccess(response.data.results, action.tasksType))
        }
        catch(error) {
            yield put(actions.fetchAdminTasksFail(error))
        }
    } else {
        try {
            const response = yield axios.get('/tasks/closed/')
            yield put(actions.fetchAdminTasksSuccess(response.data, action.tasksType))
        }
        catch(error) {
            yield put(actions.fetchAdminTasksFail(error))
        }
    }
}

export function* addAdminTaskSaga(action) {
    try {
        yield axios.post('/tasks/', {
            dataset: action.task.dataset,
            marker: action.task.marker,
            title: action.task.title,
            images_count: action.task.imagesCount,
            description: action.task.description
        })
        yield put(actions.fetchAdminTasks(true))
    }
    catch(error) {
        console.log(error)
    }
}

export function* deleteAdminTaskSaga(action) {
    try {
        yield axios.delete(`/tasks/${action.id}`)
        yield put(actions.fetchAdminTasks(true))
    }
    catch(error) {
        console.log(error)
    }
}

export function* getTaskInfoSaga(action) {
    try {
        const response = yield axios.get(`/tasks/${action.id}`)
        yield put(actions.setCurrentTask(response.data))
    }
    catch(error) {
        console.log(error)
    }
}

export function* competeTaskSaga(action) {
    try {
        yield axios.post(`/tasks/${action.id}/close/`)
        yield put(actions.fetchAdminTasks())
    }
    catch(error) {
        console.log(error)
    }
}