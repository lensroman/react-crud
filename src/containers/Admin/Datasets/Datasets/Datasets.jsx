import React, { useEffect, useRef, useState } from 'react';

import {
  Box, Button, CircularProgress, Modal, TextField, Typography,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../../../Store/actions/rootAction';

import classes from './Datasets.module.scss';

import DatasetCard from '../../../../components/DatasetCard/DatasetCard';
import CustomAlert from '../../../../components/CustomAlert/CustomAlert';
import PageHeader from '../../../../components/PageHeader/PageHeader'

function Datasets(props) {
  const [modalOpen, setModalOpen] = useState(false)

  const [datasetName, setDatasetName] = useState('')
  const [datasetDescription, setDatasetDescription] = useState('')
  const [datasetFile, setDatasetFile] = useState(null)

  const [page, setPage] = useState({
    limit: 9,
    offset: 0,
  })

  const { onFetchDatasets } = props

  useEffect(() => {
    onFetchDatasets(page)
  }, [onFetchDatasets, page])

  const downloadButton = useRef(null)

  const navigate = useNavigate()

  let cards = null

  const modalOpenHandler = () => {
    setModalOpen(true)
  }
  const modalCloseHandler = () => {
    setModalOpen(false)
  }

  const inputNameChangeHandler = (event) => {
    const newName = event.target.value
    setDatasetName(newName)
  }

  const inputDescriptionChangeHandler = (event) => {
    const newDescription = event.target.value
    setDatasetDescription(newDescription)
  }

  const fileAddHandler = (event) => {
    const newFile = event.target.files[0]
    setDatasetFile(newFile)
  }

  const addDataSetHandler = (event) => {
    setDatasetName('')
    setDatasetFile(null)
    setDatasetDescription('')
    event.preventDefault()
    modalCloseHandler()
    props.onAddDataset(datasetName, datasetDescription, datasetFile, page)
  }

  const deleteDataSetHandler = (id) => {
    props.onDeleteDataset(id, page)
  }

  const downloadButtonHandler = () => {
    downloadButton.current.click()
  }

  const changeRouteHandler = (id) => {
    const path = `/samples/${id}/`
    navigate(path)
  }

  const pageChangeHandler = (event, value) => {
    setPage({
      limit: 9,
      offset: (9 * value - 9),
    })
  }

  const modal = (
    <Modal
      open={modalOpen}
      onClose={modalCloseHandler}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box className={classes.DataSetsModal}>
        <Typography variant="h6">Добавьте новую выборку</Typography>
        <Box className={classes.ModalInputs}>
          <TextField
            size="small"
            sx={{ width: '60%' }}
            required
            label="Название выборки"
            autoComplete="off"
            onChange={(event) => inputNameChangeHandler(event)}
          />
          <input
            ref={downloadButton}
            required
            type="file"
            onInput={fileAddHandler}
            style={{ display: 'none' }}
          />
          <Button onClick={downloadButtonHandler} variant="outlined">Загрузить выборку</Button>
        </Box>
        <TextField
          fullWidth
          multiline
          label="Описание"
          autoComplete="off"
          sx={{
            mt: 2,
            mb: 2,
          }}
          onChange={(event) => inputDescriptionChangeHandler(event)}
        />
        <Button onClick={(event) => addDataSetHandler(event)}>Добавить</Button>
      </Box>
    </Modal>
  )

  if (props.loading) {
    cards = <CircularProgress />
  }

  if (props.datasets.length > 0) {
    cards = (
      props.datasets.map((dataset) => (
        <DatasetCard
          key={dataset.id}
          id={dataset.id}
          name={dataset.name}
          description={dataset.description}
          percent={dataset.percent}
          delete={() => deleteDataSetHandler(dataset.id)}
          openDataset={() => changeRouteHandler(dataset.id)}
        />
      ))
    )
  }

  let alert = null

  if (props.error) {
    alert = <CustomAlert errors={props.error} />
  }

  return (
    <div className={classes.DataSets}>
      <PageHeader
        datasets
        count={props.count}
        pageChange={pageChangeHandler}
        modalOpen={modalOpenHandler}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {cards}
      </Box>
      {modal}
      {alert}
    </div>
  )
}

const mapStateToProps = (state) => ({
  count: state.datasets.count,
  datasets: state.datasets.datasets,
  loading: state.datasets.loading,
  error: state.datasets.error,
})

const mapDispatchToProps = (dispatch) => ({
  onFetchDatasets: (page) => dispatch(actions.fetchDatasets(page)),
  onAddDataset: (name, description, file, page) => dispatch(actions.addDataset(name, description, file, page)),
  onDeleteDataset: (id, page) => dispatch(actions.deleteDataset(id, page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Datasets);
