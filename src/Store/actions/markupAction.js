import * as actionTypes from './actionTypes';

export const addNewRegion = (category) => ({
  type: actionTypes.ADD_NEW_REGION,
  category,
})

export const cancelMarkup = () => ({
  type: actionTypes.CANCEL_MARKUP,
})

export const mouseDown = (event) => ({
  type: actionTypes.MOUSE_DOWN,
  event,
})

export const mouseMoveRect = (event) => ({
  type: actionTypes.MOUSE_MOVE_RECT,
  event,
})
export const mouseMovePolygon = (event) => ({
  type: actionTypes.MOUSE_MOVE_POLYGON,
  event,
})

export const mouseUpPolygon = (event) => ({
  type: actionTypes.MOUSE_UP_POLYGON,
  event,
})
export const mouseUpRect = (event) => ({
  type: actionTypes.MOUSE_UP_RECT,
  event,
})

export const rectModeOn = () => ({
  type: actionTypes.RECT_MODE_ON,
})
export const polygonModeOn = () => ({
  type: actionTypes.POLYGON_MODE_ON,
})

export const imageSaveAsJSON = () => ({
  type: actionTypes.IMAGE_SAVE_JSON,
})
