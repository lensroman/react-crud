import React from 'react'

import axios from '../../axios-instance'

import useImage from 'use-image'
import { Image, Layer, Stage } from 'react-konva'
import CircularProgress from '@mui/material/CircularProgress'

function CanvasAdmin(props) {
  const [img] = useImage(`${axios.defaults.baseURL}/${props.path}/${props.imgType}/${props.name}${props.extension}`)

  let stageWidth = 0
  let stageHeight = 0

  let konvaStage = <CircularProgress />

  if (img) {
    stageWidth = img.width + 100
    stageHeight = img.height + 100
    konvaStage = (
      <Stage
        x={props.stage.x}
        y={props.stage.y}
        width={stageWidth}
        height={stageHeight}
        style={{ border: '1px solid #000' }}
      >
        <Layer>
          <Image
            draggable
            image={img}
            scaleX={props.image.scale}
            scaleY={props.image.scale}
            x={props.image.x}
            y={props.image.y}
            onDragMove={(event) => props.imageDragMove(event)}
            onDragEnd={(event) => props.imageDragEnd(event)}
            onMouseMove={(event) => props.imageCoords(event)}
            onWheel={props.imageZoom}
          />
        </Layer>
      </Stage>
    )
  }

  return (
    <div>
      {konvaStage}
    </div>
  )
}

export default CanvasAdmin
