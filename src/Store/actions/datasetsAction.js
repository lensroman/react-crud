import * as actionTypes from './actionTypes'

export const fetchDatasets = () => {
    return {
        type: actionTypes.FETCH_DATASETS
    }
}

export const fetchDatasetsStart = () => {
    return {
        type: actionTypes.FETCH_DATASETS_START
    }
}

export const fetchDatasetsSuccess = (datasets) => {
    return {
        type: actionTypes.FETCH_DATASETS_SUCCESS,
        datasets: datasets
    }
}

export const fetchDatasetsFail = (error) => {
    return {
        type: actionTypes.FETCH_DATASETS_FAIL,
        error: error
    }
}