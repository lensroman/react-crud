import * as actionTypes from './actionTypes';

export const fetchAdminTasks = (tasksType) => {
    return {
        type: actionTypes.FETCH_ADMIN_TASKS,
        tasksType: tasksType
    }
}

export const fetchAdminTasksSuccess = (tasks, tasksType) => {
    return {
        type: actionTypes.FETCH_ADMIN_TASKS_SUCCESS,
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

export const completeTask = (id) => {
    return {
        type: actionTypes.COMPLETE_TASK,
        id: id
    }
}

export const changeTasksType = () => {
    return {
        type: actionTypes.CHANGE_TASKS_TYPE
    }
}