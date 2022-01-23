import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    adminTasks: [],
    currentTask: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ADMIN_TASKS: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.FETCH_ADMIN_TASKS_SUCCESS: {
            return {
                ...state,
                loading: false,
                adminTasks: action.tasks
            }
        }
        case actionTypes.FETCH_ADMIN_TASKS_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case actionTypes.SET_CURRENT_TASK: {
            return {
                ...state,
                currentTask: action.data
            }
        }
        case actionTypes.CLEAR_CURRENT_TASK: {
            return {
                ...state,
                currentTask: null
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer;