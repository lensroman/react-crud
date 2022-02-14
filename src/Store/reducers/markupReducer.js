import * as actionTypes from '../actions/actionTypes';
import { getRandomColor, getRelativePointerPosition, getUniqueId } from '../../shared/utility';

const initialState = {
  regions: [],
  points: [],
  color: null,
  firstLine: true,
  startDraw: false,
  markupMode: false,
  polygonMode: false,
  rectMode: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NEW_REGION: {
      const regions = [...state.regions]
      let color = null
      switch (action.category) {
        case 'building': {
          color = '#b8baba'
          break
        }
        case 'water': {
          color = '#4899d5'
          break
        }
        case 'ground': {
          color = '#996d3f'
          break
        }
        case 'non-category': {
          color = '#c53a3a'
          break
        }
        default: return
      }
      regions.push({
        id: getUniqueId(),
        category_id: action.category,
        color,
        segmentation: state.points,
      })
      return {
        ...state,
        markupMode: false,
        firstLine: true,
        color,
        regions,
      }
    }
    case actionTypes.CANCEL_MARKUP: {
      return {
        ...state,
        markupMode: false,
        startDraw: false,
        firstLine: true,
        points: [],
      }
    }
    case actionTypes.MOUSE_DOWN: {
      const color = getRandomColor()
      const newPoints = []
      const point = getRelativePointerPosition(action.event.target.getStage())
      newPoints.push(point.x, point.y)
      return {
        ...state,
        points: newPoints,
        color,
        markupMode: true,
        startDraw: true,
      }
    }
    case actionTypes.MOUSE_MOVE_POLYGON: {
      const point = getRelativePointerPosition(action.event.target.getStage())
      const newPoints = [state.points[0], state.points[1], point.x, point.y]
      return {
        ...state,
        points: newPoints,
      }
    }
    case actionTypes.MOUSE_MOVE_RECT: {
      const point = getRelativePointerPosition(action.event.target.getStage())
      const newPoints = [
        state.points[0],
        state.points[1],
        state.points[0],
        point.y, point.x,
        point.y, point.x,
        state.points[1],
      ]
      return {
        ...state,
        points: newPoints,
      }
    }
    case actionTypes.MOUSE_UP_POLYGON: {
      const newPoints = [...state.points]
      const point = getRelativePointerPosition(action.event.target.getStage())
      newPoints.push(point.x, point.y)
      return {
        ...state,
        startDraw: false,
        points: newPoints,
        firstLine: false,
      }
    }
    case actionTypes.MOUSE_UP_RECT: {
      const point = getRelativePointerPosition(action.event.target.getStage())
      const newPoints = [
        state.points[0],
        state.points[1],
        state.points[0],
        point.y, point.x,
        point.y, point.x,
        state.points[1],
      ]
      return {
        ...state,
        startDraw: false,
        points: newPoints,
        firstLine: true,
      }
    }
    case actionTypes.RECT_MODE_ON: {
      return {
        ...state,
        points: [],
        rectMode: true,
        polygonMode: false,
      }
    }
    case actionTypes.POLYGON_MODE_ON: {
      return {
        ...state,
        points: [],
        rectMode: false,
        polygonMode: true,
      }
    }
    case actionTypes.IMAGE_SAVE_JSON: {
      return {
        ...state,
      }
    }
    default: {
      return state
    }
  }
}

export default reducer;
