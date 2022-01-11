import * as actionTypes from './actionTypes'

export const fetchDataSets = () => {
    return {
        type: actionTypes.FETCH_DATASETS
    }
}

export const fetchDataSetsStart = () => {
    return {
        type: actionTypes.FETCH_DATASETS_START
    }
}

export const fetchDataSetsSuccess = (dataSets) => {
    return {
        type: actionTypes.FETCH_DATASETS_SUCCESS,
        dataSets: dataSets
    }
}

export const fetchDataSetsFail = (error) => {
    return {
        type: actionTypes.FETCH_DATASETS_FAIL,
        error: error
    }
}

export const addDataSet = (name, file) => {
    return {
        type: actionTypes.ADD_DATASET,
        name: name,
        file: file
    }
}

export const deleteDataSet = (id) => {
    return {
        type: actionTypes.DELETE_DATASET,
        id: id
    }
}