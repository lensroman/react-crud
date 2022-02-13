import * as actionTypes from './actionTypes'

export const fetchDatasets = (page) => {
    return {
        type: actionTypes.FETCH_DATASETS,
        page: page
    }
}

export const fetchDatasetsStart = () => {
    return {
        type: actionTypes.FETCH_DATASETS_START
    }
}

export const fetchDatasetsSuccess = (count, datasets) => {
    return {
        type: actionTypes.FETCH_DATASETS_SUCCESS,
        datasets: datasets,
        count: count
    }
}

export const fetchDatasetsFail = (error) => {
    return {
        type: actionTypes.FETCH_DATASETS_FAIL,
        error: error
    }
}

export const addDataset = (name, description, file, page) => {
    return {
        type: actionTypes.ADD_DATASET,
        name: name,
        description: description,
        file: file,
        page: page
    }
}

export const addDatasetFail = (error) => {
    return {
        type: actionTypes.ADD_DATASET_FAIL,
        error: error
    }
}

export const deleteDataset = (id, page) => {
    return {
        type: actionTypes.DELETE_DATASET,
        id: id,
        page: page
    }
}

export const getDatasetInfo = (id, page) => {
    return {
        type: actionTypes.GET_DATASET_INFO,
        id: id,
        page: page
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
    return {
        type: actionTypes.UPLOAD_DATASET,
        id: id,
        name: name,
        imagesRange: imagesRange,
        length: length
    }
}

export const fetchAllDatasets = () => {
    return {
        type: actionTypes.FETCH_ALL_DATASETS
    }
}