import * as actionTypes from "./actionTypes";

export const commentTask = (comment, taskId, userId) => {
    return {
        type: actionTypes.COMMENT_TASK,
        comment: comment,
        taskId: taskId,
        userId: userId
    }
}