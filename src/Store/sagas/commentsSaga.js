import { put } from 'redux-saga/effects';

import * as actions from '../actions/rootAction';
import axios from '../../axios-instance';

export function* addCommentSaga(action) {
  try {
    yield axios.post('/comments/', {
      content: action.comment,
      task: action.taskId,
      commentator: action.userId,
    })
    yield put(actions.fetchComments())
  } catch (error) {
    console.log(error)
  }
}

export function* fetchCommentsSaga() {
  try {
    const response = yield axios.get('/comments/')
    yield put(actions.fetchCommentsSuccess(response.data.results))
  } catch (error) {
    yield put(actions.fetchCommentsFail(error))
  }
}

export function* deleteCommentSaga(action) {
  try {
    yield axios.delete(`/comments/${action.id}/`)
    yield put(actions.fetchComments())
  } catch (error) {
    console.log(error)
  }
}
