import * as actionTypes from "./actionTypes";

export const fetchComments = (taskId) => {
    return {
        type: actionTypes.FETCH_COMMENTS,
        taskId: taskId
    }
}

export const fetchCommentsSuccess = (data) => {
    return {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        data: data
    }
}

export const fetchCommentsFail = (error) => {
    return {
        type: actionTypes.FETCH_COMMENTS_FAIL,
        error: error
    }
}

export const addComment = (comment, taskId, userId) => {
    return {
        type: actionTypes.ADD_COMMENT,
        comment: comment,
        taskId: taskId,
        userId: userId
    }
}

export const deleteComment = (id) => {
    return {
        type: actionTypes.DELETE_COMMENT,
        id: id
    }
}
