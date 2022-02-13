import * as actionTypes from './actionTypes';

export const fetchAdminTasks = (tasksType, page) => {
    return {
        type: actionTypes.FETCH_ADMIN_TASKS,
        tasksType: tasksType,
        page: page
    }
}

export const fetchAdminTasksSuccess = (count, tasks, tasksType) => {
    return {
        type: actionTypes.FETCH_ADMIN_TASKS_SUCCESS,
        count: count,
        tasks: tasks,
        tasksType: tasksType
    }
}

export const fetchAdminTasksFail = (error) => {
    return {
        type: actionTypes.FETCH_ADMIN_TASKS_FAIL,
        error: error
    }
}

export const addAdminTask = (task, page) => {
    return {
        type: actionTypes.ADD_ADMIN_TASK,
        task: task,
        page: page
    }
}

export const addAdminTaskFail = error => {
    return {
        type: actionTypes.ADD_ADMIN_TASK_FAIL,
        error: error
    }
}

export const deleteAdminTask = (id, page) => {
    return {
        type: actionTypes.DELETE_ADMIN_TASK,
        id: id,
        page: page
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

export const completeTask = (data, comment) => {
    return {
        type: actionTypes.COMPLETE_TASK,
        data: data,
        comment: comment
    }
}

export const completeTaskFail = (error) => {
    return {
        type: actionTypes.COMPLETE_TASK_FAIL,
        error: error
    }
}

export const changeTasksType = () => {
    return {
        type: actionTypes.CHANGE_TASKS_TYPE
    }
}

export const cleanErrors = () => {
    return {
        type: actionTypes.CLEAN_ERRORS
    }
}