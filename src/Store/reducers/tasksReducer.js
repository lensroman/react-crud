import * as actionTypes from '../actions/actionTypes';

const initialState = {
  count: null,
  loading: false,
  error: null,
  adminTasks: [],
  tasksType: 'opened',
  currentTask: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ADMIN_TASKS: {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.FETCH_ADMIN_TASKS_SUCCESS: {
      return {
        ...state,
        loading: false,
        count: action.count,
        adminTasks: action.tasks,
      }
    }
    case actionTypes.FETCH_ADMIN_TASKS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    case actionTypes.SET_CURRENT_TASK: {
      return {
        ...state,
        currentTask: action.data,
      }
    }
    case actionTypes.CLEAR_CURRENT_TASK: {
      return {
        ...state,
        currentTask: null,
      }
    }
    case actionTypes.CHANGE_TASKS_TYPE: {
      const updatedValue = action.status
      return {
        ...state,
        tasksType: updatedValue,
      }
    }
    case actionTypes.COMPLETE_TASK_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    case actionTypes.ADD_ADMIN_TASK_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    case actionTypes.CLOSE_TASK_SUCCESS: {
      return {
        ...state,
        error: action.message,
      }
    }
    case actionTypes.CLOSE_TASK_FAIL: {
      return {
        ...state,
        error: action.error,
      }
    }
    case actionTypes.OPEN_TASK_SUCCESS: {
      return {
        ...state,
        error: action.message,
      }
    }
    case actionTypes.OPEN_TASK_FAIL: {
      return {
        ...state,
        error: action.error,
      }
    }
    case actionTypes.CLEAN_ERRORS: {
      return {
        ...state,
        error: null,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default reducer;
