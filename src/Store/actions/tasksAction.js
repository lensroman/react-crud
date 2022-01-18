import * as actionTypes from './actionTypes';

export const fetchAdminTasks = () => {
    return {
        type: actionTypes.FETCH_ADMIN_TASKS
    }
}

export const fetchAdminTasksSuccess = (tasks) => {
    return {
        type: actionTypes.FETCH_ADMIN_TASKS_SUCCESS,
        tasks: tasks
    }
}

export const fetchAdminTasksFail = (error) => {
    return {
        type: actionTypes.FETCH_ADMIN_TASKS_FAIL,
        error: error
    }
}

export const addAdminTask = (task) => {
    return {
        type: actionTypes.ADD_ADMIN_TASK,
        task: task
    }
}