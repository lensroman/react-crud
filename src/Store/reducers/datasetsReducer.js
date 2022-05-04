import * as actionTypes from '../actions/actionTypes';

const initialState = {
  count: null,
  loading: false,
  error: null,
  datasets: [],
  currentDataset: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATASETS_START: {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.FETCH_DATASETS_SUCCESS: {
      return {
        ...state,
        loading: false,
        datasets: action.datasets,
        count: action.count,
      }
    }
    case actionTypes.FETCH_DATASETS_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    case actionTypes.GET_DATASET_INFO: {
      return {
        ...state,
        loading: true,
      }
    }
    case actionTypes.GET_DATASET_INFO_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    }
    case actionTypes.SET_CURRENT_DATASET: {
      return {
        ...state,
        loading: false,
        currentDataset: action.data,
      }
    }
    case actionTypes.ADD_DATASET_FAIL: {
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
    case actionTypes.CLEAR_CURRENT_DATASET: {
      return {
        ...state,
        currentDataset: null,
      }
    }
    case actionTypes.FETCH_IMAGES_NAMES_SUCCESS: {
      return {
        ...state,
        currentDataset: {
          ...state.currentDataset,
          filesNames: action.filesNames,
          extensions: action.extensions,
        },
      }
    }
    case actionTypes.FETCH_IMAGES_NAMES_FAILED: {
      return {
        ...state,
        error: action.error,
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
