import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    datasets: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DATASETS_START: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.FETCH_DATASETS_SUCCESS: {
            return {
                ...state,
                loading: false,
                datasets: action.datasets
            }
        }
        case actionTypes.FETCH_DATASETS_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.error
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