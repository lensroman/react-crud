import React, { useEffect, useState } from 'react'

import * as actions from '../../../Store/actions/rootAction'
import { connect } from 'react-redux'

import CanvasAdmin from '../../../components/CanvasAdmin/CanvasAdmin'
import PageHeader from '../../../components/PageHeader/PageHeader'

import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function ImagesViewer(props) {
  const navigate = useNavigate()

  const { onFetchImagesNames } = props

  const [imgType, setImgType] = useState('')
  const [imgNumber, setImgNumber] = useState(0)

  const [stage, setStage] = useState({
    x: 1,
    y: 1,
  })

  const [image, setImage] = useState({
    scale: 1,
    x: 50,
    y: 50,
  })

  const [coords, setCoords] = useState({
    x: 0,
    y: 0,
  })

  const imgTypes = [
    {
      label: 'ThermalImages',
      key: 1,
    },
    {
      label: 'Class',
      key: 2,
    },
    {
      label: 'ColorImages',
      key: 3,
    },
    {
      label: 'Instance',
      key: 4,
    },
  ]

  useEffect(async () => {
    const imagesRange = {
      from: 0,
      to: props.dataset.length,
    }
    onFetchImagesNames(props.dataset.id, imagesRange)
  }, [])

  let imagePath = null
  let imageName = null
  let ImageExtension = null

  if (props.dataset && props.dataset.filesNames) {
    imagePath = props.dataset.static_base_path
    imageName = props.dataset.filesNames[imgNumber]
    ImageExtension = props.dataset.extensions[imgType]
  }

  const selectImageTypeHandler = (e) => {
    setImgType(e.target.value)
  }

  const goBackHandler = () => {
    navigate(`../samples/${props.dataset.id}`)
  }

  const nextImageHandler = () => {
    setImgNumber(imgNumber + 1)
    setStage({
      x: 1,
      y: 1,
    })
    setImage({
      scale: 1,
      x: 50,
      y: 50,
    })
  }

  const prevImageHandler = () => {
    setImgNumber(imgNumber - 1)
    setStage({
      x: 1,
      y: 1,
    })
    setImage({
      scale: 1,
      x: 50,
      y: 50,
    })
  }

  const selectImageNumberHandler = (e) => {
    setImgNumber(e.target.value)
    setStage({
      x: 1,
      y: 1,
    })
    setImage({
      scale: 1,
      x: 50,
      y: 50,
    })
  }

  const imageDragMoveHandler = (e) => {
    const img = e.target
    const stageDom = img.getStage()
    const absPos = img.getAbsolutePosition()
    const offsetX = img.x() - absPos.x
    const offsetY = img.y() - absPos.y
    const newAbsPos = { ...absPos }
    if (image.scale <= 1.01) {
      if (img.x() < 0) {
        newAbsPos.x = -offsetX;
      }
      if (img.y() < 0) {
        newAbsPos.y = -offsetY;
      }
      if (img.x() + img.width() > stageDom.width()) {
        newAbsPos.x = stageDom.width() - img.width() - offsetX;
      }
      if (img.y() + img.height() > stageDom.height()) {
        newAbsPos.y = stageDom.height() - img.height() - offsetY;
      }
      img.setAbsolutePosition(newAbsPos)
    } else if (image.scale > 1.01) {
      if (img.x() > 0) {
        newAbsPos.x = -offsetX;
      }
      if (img.y() > 0) {
        newAbsPos.y = -offsetY;
      }
      if (img.width() * image.scale + img.x() < stageDom.width()) {
        newAbsPos.x = -(img.width() * image.scale - stageDom.width())
      }
      if (img.height() * image.scale + img.y() < stageDom.height()) {
        newAbsPos.y = -(img.height() * image.scale - stageDom.height())
      }
      img.setAbsolutePosition(newAbsPos)
    }
  }

  const imageDragEndHandler = (e) => {
    setImage({
      scale: image.scale,
      x: e.target.x(),
      y: e.target.y(),
    })
  }

  const imageCoordsHandler = (e) => {
    setCoords({
      x: +e.target.getRelativePointerPosition().x.toFixed(2),
      y: +e.target.getRelativePointerPosition().y.toFixed(2),
    })
  }

  const imageZoomHandler = (e) => {
    e.evt.preventDefault()
    const img = e.target
    const scaleBy = 1.15
    const oldScale = img.scaleX()
    const mousePointTo = {
      x: img.getRelativePointerPosition().x / oldScale - img.x() / oldScale,
      y: img.getRelativePointerPosition().y / oldScale - img.y() / oldScale,
    };
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy
    if (newScale >= 1) {
      setImage({
        scale: newScale,
        x: -(mousePointTo.x - img.getRelativePointerPosition().x / newScale) * newScale,
        y: -(mousePointTo.y - img.getRelativePointerPosition().y / newScale) * newScale,
      })
    }
    setCoords({
      x: +e.target.getRelativePointerPosition().x.toFixed(2),
      y: +e.target.getRelativePointerPosition().y.toFixed(2),
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <PageHeader
        goBack={goBackHandler}
        imagesViewer
        datasetName={props.dataset.name}
        imgType={imgType}
        imgTypes={imgTypes}
        selectImageType={selectImageTypeHandler}
        datasetExtensions={props.dataset.extensions}
        datasetNames={props.dataset.filesNames}
        nextImage={nextImageHandler}
        prevImage={prevImageHandler}
        number={imgNumber}
        length={props.dataset.length - 1}
        selectImageNumber={selectImageNumberHandler}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {imgType && (
          <Typography>Изображение: x: {coords.x}, y: {coords.y}, масштаб: {((image.scale) * 100).toFixed(0)}%</Typography>
        )}
        {!imgType && <Typography variant="h5" color="primary">Выберите тип изображений</Typography>}
        {imgType && (
        <CanvasAdmin
          imgType={imgType}
          path={imagePath}
          name={imageName}
          extension={ImageExtension}
          stage={stage}
          image={image}
          imageDragEnd={imageDragEndHandler}
          imageDragMove={imageDragMoveHandler}
          imageCoords={imageCoordsHandler}
          imageZoom={imageZoomHandler}
        />
        )}
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  dataset: state.datasets.currentDataset,
})

const mapDispatchToProps = (dispatch) => ({
  onFetchImagesNames: (id, imagesRange) => dispatch(actions.fetchImagesNames(id, imagesRange)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImagesViewer)
