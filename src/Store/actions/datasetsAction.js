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

export const addDataset = (name, description, file) => {
    return {
        type: actionTypes.ADD_DATASET,
        name: name,
        description: description,
        file: file
    }
}

export const deleteDataset = (id) => {
    return {
        type: actionTypes.DELETE_DATASET,
        id: id
    }
}

export const getDatasetInfo = (id) => {
    return {
        type: actionTypes.GET_DATASET_INFO,
        id: id
    }
}

export const setCurrentDataset = (data) => {
    return {
        type: actionTypes.SET_CURRENT_DATASET,
        data: data
    }
}

export const clearCurrentDataset = () => {
    return {
        type: actionTypes.CLEAR_CURRENT_DATASET
    }
}

export const uploadDataset = (id, name, imagesRange = null, length = null) => {
    console.log('action', length)
    return {
        type: actionTypes.UPLOAD_DATASET,
        id: id,
        name: name,
        imagesRange: imagesRange,
        length: length
    }
}