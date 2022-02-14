import * as actionTypes from './actionTypes';

export const fetchAdminTasks = (tasksType, page) => ({
  type: actionTypes.FETCH_ADMIN_TASKS,
  tasksType,
  page,
})

export const fetchAdminTasksSuccess = (count, tasks, tasksType) => ({
  type: actionTypes.FETCH_ADMIN_TASKS_SUCCESS,
  count,
  tasks,
  tasksType,
})

export const fetchAdminTasksFail = (error) => ({
  type: actionTypes.FETCH_ADMIN_TASKS_FAIL,
  error,
})

export const addAdminTask = (task, page) => ({
  type: actionTypes.ADD_ADMIN_TASK,
  task,
  page,
})

export const addAdminTaskFail = (error) => ({
  type: actionTypes.ADD_ADMIN_TASK_FAIL,
  error,
})

export const deleteAdminTask = (id, page) => ({
  type: actionTypes.DELETE_ADMIN_TASK,
  id,
  page,
})

export const getTaskInfo = (id) => ({
  type: actionTypes.GET_TASK_INFO,
  id,
})

export const setCurrentTask = (data) => ({
  type: actionTypes.SET_CURRENT_TASK,
  data,
})

export const clearCurrentTask = () => ({
  type: actionTypes.CLEAR_CURRENT_TASK,
})

export const completeTask = (data, comment) => ({
  type: actionTypes.COMPLETE_TASK,
  data,
  comment,
})

export const completeTaskFail = (error) => ({
  type: actionTypes.COMPLETE_TASK_FAIL,
  error,
})

export const changeTasksType = () => ({
  type: actionTypes.CHANGE_TASKS_TYPE,
})

export const cleanErrors = () => ({
  type: actionTypes.CLEAN_ERRORS,
})
