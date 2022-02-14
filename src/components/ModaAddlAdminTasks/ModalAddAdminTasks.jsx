import React, { useEffect } from 'react';

import {
  Box, Button, MenuItem, Modal, TextField, Typography,
} from '@mui/material';
import { connect } from 'react-redux';
import classes from '../../containers/Admin/Tasks/AdminTasks/AdminTasks.module.scss';

import * as actions from '../../Store/actions/rootAction';

function ModalAddAdminTasks(props) {
  const { onGetUsers, onFetchAllDatasets } = props

  useEffect(() => {
    onFetchAllDatasets()
    onGetUsers()
  }, [onGetUsers, onFetchAllDatasets])

  let count = 0

  if (props.selectedDataset) {
    const selectedDataset = props.datasets.find((dataset) => dataset.id === props.selectedDataset)
    count = selectedDataset.length - selectedDataset.last_img
  }

  return (
    <Modal
      open={props.modalOpen}
      onClose={props.modalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box fullWidth className={classes.AdminTasksModal}>
        <Typography variant="h6">Создайте новую задачу</Typography>
        <Box className={classes.ModalInputs}>
          <TextField
            required
            fullWidth
            label="Выборка"
            select
            defaultValue=""
            sx={{ width: '48%' }}
            value={props.dataset}
            onChange={(event) => props.datasetSelect(event)}
          >
            {props.datasets.map((dataset) => (
              <MenuItem
                key={dataset.id}
                id={dataset.id}
                value={dataset.id}
              >
                {dataset.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            select
            defaultValue=""
            label="Разметчик"
            sx={{ width: '48%' }}
            onChange={(event) => props.markerSelect(event)}
          >
            {props.markupUsers.map((user) => (
              <MenuItem
                key={user.id}
                id={user.id}
                value={user.id}
              >
                {user.username}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box className={classes.ModalInputs} sx={{ mb: 1 }}>
          <TextField
            helperText={' '}
            required
            autoComplete="off"
            sx={{ width: '48%' }}
            label="Название задачи"
            value={props.title}
            onChange={(event) => props.titleChange(event)}
          />
          <TextField
            disabled={count === 0}
            helperText={count > 0 ? `От 0 до ${count}` : 'Нет изображений для разметки'}
            required
            autoComplete="off"
            label="Кол-во изображений"
            sx={{ width: '48%' }}
            value={props.count}
            onChange={(event) => props.imagesCountChange(event)}
          />
        </Box>
        <TextField
          required
          autoComplete="off"
          fullWidth
          label="Описание"
          multiline
          value={props.description}
          onChange={(event) => props.descriptionChange(event)}
        />
        <Button onClick={props.submitNewTask}>Создать</Button>
      </Box>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  datasets: state.datasets.datasets,
  markupUsers: state.auth.markupUsers,
})

const mapDispatchToProps = (dispatch) => ({
  onFetchAllDatasets: () => dispatch(actions.fetchAllDatasets()),
  onGetUsers: () => dispatch(actions.getUsers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddAdminTasks);
