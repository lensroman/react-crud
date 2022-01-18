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

export const addDataset = (name, file) => {
    return {
        type: actionTypes.ADD_DATASET,
        name: name,
        file: file
    }
}

export const deleteDataset = (id) => {
    return {
        type: actionTypes.DELETE_DATASET,
        id: id
    }
}