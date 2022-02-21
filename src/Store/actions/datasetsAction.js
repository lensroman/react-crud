import * as actionTypes from './actionTypes'

export const fetchDatasets = (page) => ({
  type: actionTypes.FETCH_DATASETS,
  page,
})

export const fetchDatasetsStart = () => ({
  type: actionTypes.FETCH_DATASETS_START,
})

export const fetchDatasetsSuccess = (count, datasets) => ({
  type: actionTypes.FETCH_DATASETS_SUCCESS,
  datasets,
  count,
})

export const fetchDatasetsFail = (error) => ({
  type: actionTypes.FETCH_DATASETS_FAIL,
  error,
})

export const addDataset = (name, description, file, page) => ({
  type: actionTypes.ADD_DATASET,
  name,
  description,
  file,
  page,
})

export const addDatasetFail = (error) => ({
  type: actionTypes.ADD_DATASET_FAIL,
  error,
})

export const deleteDataset = (id, page) => ({
  type: actionTypes.DELETE_DATASET,
  id,
  page,
})

export const getDatasetInfo = (id, page) => ({
  type: actionTypes.GET_DATASET_INFO,
  id,
  page,
})

export const getDatasetInfoFail = (error) => ({
  type: actionTypes.GET_DATASET_INFO_FAIL,
  error,
})

export const setCurrentDataset = (data) => ({
  type: actionTypes.SET_CURRENT_DATASET,
  data,
})

export const clearCurrentDataset = () => ({
  type: actionTypes.CLEAR_CURRENT_DATASET,
})

export const uploadDataset = (id, name, imagesRange = null, length = null) => ({
  type: actionTypes.UPLOAD_DATASET,
  id,
  name,
  imagesRange,
  length,
})

export const fetchAllDatasets = () => ({
  type: actionTypes.FETCH_ALL_DATASETS,
})
