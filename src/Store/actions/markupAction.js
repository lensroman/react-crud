import * as actionTypes from './actionTypes';

export const addNewRegion = (category) => {
    return {
        type: actionTypes.ADD_NEW_REGION,
        category: category
    }
}

export const cancelMarkup = () => {
    return {
        type: actionTypes.CANCEL_MARKUP
    }
}

export const mouseDown = event => {
    return {
        type: actionTypes.MOUSE_DOWN,
        event: event
    }
}

export const mouseMoveRect = event => {
    return {
        type: actionTypes.MOUSE_MOVE_RECT,
        event: event
    }
}
export const mouseMovePolygon = event => {
    return {
        type: actionTypes.MOUSE_MOVE_POLYGON,
        event: event
    }
}

export const mouseUpPolygon = event => {
    return {
        type: actionTypes.MOUSE_UP_POLYGON,
        event: event
    }
}
export const mouseUpRect = event => {
    return {
        type: actionTypes.MOUSE_UP_RECT,
        event: event
    }
}

export const rectModeOn = () => {
    return {
        type: actionTypes.RECT_MODE_ON,
    }
}
export const polygonModeOn = () => {
    return {
        type: actionTypes.POLYGON_MODE_ON
    }
}

export const imageSaveAsJSON = () => {
    return {
        type: actionTypes.IMAGE_SAVE_JSON
    }
}
