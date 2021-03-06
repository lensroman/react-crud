import React, { useCallback, useEffect } from 'react';

import { connect } from 'react-redux';
import useImage from 'use-image';
import * as actions from '../../../Store/actions/rootAction';

import json from '../../../assets/json.json';
import CanvasMarkup from '../../../components/CanvasMarkup/CanvasMarkup';

function Markup(props) {
  const { onRegionAdd } = props
  const { onMarkupCancel } = props

  const [imgDOM] = useImage(json.img)

  const stopMarkupHandler = useCallback((event) => {
    event.preventDefault()
    switch (event.code) {
      case 'Space': {
        onRegionAdd('non-category')
        break
      }
      case 'KeyQ': {
        onMarkupCancel()
        break
      }
      case 'Digit1': {
        onRegionAdd('building')
        break
      }
      case 'Digit2': {
        onRegionAdd('water')
        break
      }
      case 'Digit3': {
        onRegionAdd('ground')
        break
      }
      default:
    }
  }, [onRegionAdd, onMarkupCancel])

  const canvasMouseDownHandler = (event) => {
    if (props.rectMode || props.polygonMode) {
      event.evt.preventDefault()
      if (props.firstLine) {
        props.onMouseDown(event)
      }
    }
  }

  const canvasMouseMoveHandler = (event) => {
    if (props.rectMode || props.polygonMode) {
      event.evt.preventDefault()
      if (props.startDraw && props.polygonMode) {
        props.onMouseMovePolygon(event)
      }
      if (props.startDraw && props.rectMode) {
        props.onMouseMoveRect(event)
      }
    }
  }

  const canvasMouseUpHandler = (event) => {
    if (props.rectMode || props.polygonMode) {
      event.evt.preventDefault()
      if (props.markupMode && props.polygonMode) {
        props.onMouseUpPolygon(event)
      }
      if (props.markupMode && props.rectMode) {
        props.onMouseUpRect(event)
      }
    }
  }

  const saveImageHandler = () => {
    props.onImageSaveAsJSON()
  }

  const rectModeHandler = () => {
    props.onRectMode()
  }
  const polygonModeHandler = () => {
    props.onPolygonMode()
  }

  useEffect(() => {
    if (props.markupMode) {
      window.addEventListener('keypress', stopMarkupHandler)
    } else {
      window.removeEventListener('keypress', stopMarkupHandler)
    }

    return () => window.removeEventListener('keypress', stopMarkupHandler)
  }, [props.markupMode, stopMarkupHandler])

  return (
    <div>
      <CanvasMarkup
        save={saveImageHandler}
        rectMode={rectModeHandler}
        polygonMode={polygonModeHandler}
        rect={props.rectMode}
        polygon={props.polygonMode}
        image={imgDOM}
        mouseDown={(event) => canvasMouseDownHandler(event)}
        mouseMove={(event) => canvasMouseMoveHandler(event)}
        mouseUp={(event) => canvasMouseUpHandler(event)}
        pointsMarkup={props.points}
        color={props.color}
        startDraw={props.startDraw}
        regions={props.regions}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  regions: state.markup.regions,
  points: state.markup.points,
  color: state.markup.color,
  firstLine: state.markup.firstLine,
  startDraw: state.markup.startDraw,
  markupMode: state.markup.markupMode,
  polygonMode: state.markup.polygonMode,
  rectMode: state.markup.rectMode,
})

const mapDispatchToProps = (dispatch) => ({
  onRegionAdd: (category) => dispatch(actions.addNewRegion(category)),
  onMarkupCancel: () => dispatch(actions.cancelMarkup()),
  onMouseDown: (event) => dispatch(actions.mouseDown(event)),
  onMouseMoveRect: (event) => dispatch(actions.mouseMoveRect(event)),
  onMouseMovePolygon: (event) => dispatch(actions.mouseMovePolygon(event)),
  onMouseUpPolygon: (event) => dispatch(actions.mouseUpPolygon(event)),
  onMouseUpRect: (event) => dispatch(actions.mouseUpRect(event)),
  onRectMode: () => dispatch(actions.rectModeOn()),
  onPolygonMode: () => dispatch(actions.polygonModeOn()),
  onImageSaveAsJSON: () => dispatch(actions.imageSaveAsJSON()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Markup);
