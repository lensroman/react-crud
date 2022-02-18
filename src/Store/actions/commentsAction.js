import * as actionTypes from './actionTypes';

export const fetchComments = (taskId) => ({
  type: actionTypes.FETCH_COMMENTS,
  taskId,
})

export const fetchCommentsSuccess = (data) => ({
  type: actionTypes.FETCH_COMMENTS_SUCCESS,
  data,
})

export const fetchCommentsFail = (error) => ({
  type: actionTypes.FETCH_COMMENTS_FAIL,
  error,
})

export const addComment = (comment, taskId, userId) => ({
  type: actionTypes.ADD_COMMENT,
  comment,
  taskId,
  userId,
})

export const deleteComment = (id, taskId) => ({
  type: actionTypes.DELETE_COMMENT,
  id,
  taskId,
})
