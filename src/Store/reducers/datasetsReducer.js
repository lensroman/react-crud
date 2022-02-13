import * as actionTypes from '../actions/actionTypes';

const initialState = {
    count: null,
    loading: false,
    error: null,
    datasets: [],
    currentDataset: null
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
                datasets: action.datasets,
                count: action.count
            }
        }
        case actionTypes.FETCH_DATASETS_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.error
            }
        }
        case actionTypes.SET_CURRENT_DATASET: {
            return {
                ...state,
                currentDataset: action.data
            }
        }
        case actionTypes.ADD_DATASET_FAIL: {
            return {
                ...state,
                error: action.error
            }
        }
        case actionTypes.CLEAN_ERRORS: {
            return {
                ...state,
                error: null
            }
        }
        case actionTypes.CLEAR_CURRENT_DATASET: {
            return {
                ...state,
                currentDataset: null
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