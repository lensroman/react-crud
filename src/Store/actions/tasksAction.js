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

export const deleteAdminTask = (id) => {
    return {
        type: actionTypes.DELETE_ADMIN_TASK,
        id: id
    }
}

export const getTaskInfo = (id) => {
    return {
        type: actionTypes.GET_TASK_INFO,
        id: id
    }
}

export const setCurrentTask = (data) => {
    return {
        type: actionTypes.SET_CURRENT_TASK,
        data: data
    }
}

export const clearCurrentTask = () => {
    return {
        type: actionTypes.CLEAR_CURRENT_TASK
    }
}