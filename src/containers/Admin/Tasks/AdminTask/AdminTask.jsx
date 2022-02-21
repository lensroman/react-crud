import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { connect } from 'react-redux';

import {
  Box, Button, CircularProgress, Typography,
} from '@mui/material'
import { Done, Replay, UploadFile } from '@mui/icons-material'
import * as actions from '../../../../Store/actions/rootAction';
import classes from './AdminTask.module.scss';

import Comments from '../../../Comments/Comments';
import PageHeader from '../../../../components/PageHeader/PageHeader'
import CustomAlert from '../../../../components/CustomAlert/CustomAlert'

function AdminTask(props) {
  const navigate = useNavigate()

  const params = useParams()

  const { onGetTaskInfo } = props

  useEffect(() => {
    const id = +params['*'].split('/')[0]
    onGetTaskInfo(id)
  }, [params, onGetTaskInfo])

  const goBackHandler = () => {
    props.onClearCurrentTask()
    navigate(-1)
  }

  const uploadDatasetHandler = () => {
    const { name } = props.task.dataset
    const { id } = props.task.dataset
    const imagesRange = props.task.images_range
    props.onUploadDataset(id, name, imagesRange)
  }

  const closeTaskHandler = () => {
    props.onCloseTask(props.task.id)
  }

  const openTaskHandler = () => {
    props.onOpenTask(props.task.id)
  }

  let taskPage = (
    <Box sx={{
      mt: '200px',
      display: 'flex',
      justifyContent: 'center',
    }}
    >
      <CircularProgress />
    </Box>
  )

  if (props.task) {
    const dataset = props.task.dataset.name

    const marker = props.users.find((user) => user.id === props.task.marker)?.username || 'Пользователь удален'
    let status = null

    switch (props.task.status) {
      case 'opened': {
        status = 'Открыта'
        break
      }
      case 'waited': {
        status = 'На подтверждении'
        break
      }
      case 'closed': {
        status = 'Выполнена'
        break
      }
      default: {
        return
      }
    }

    const alert = props.error ? (
      <CustomAlert errors={props.error} />
    ) : null

    let closeTaskButton = null

    let openTaskButton = null

    if (props.task.status === 'waited') {
      closeTaskButton = (
        <Button
          sx={{ ml: 5 }}
          color="success"
          variant="contained"
          startIcon={<Done />}
          onClick={closeTaskHandler}
        >
          Закрыть задачу
        </Button>
      )
    }

    if (props.task.status === 'waited' || props.task.status === 'closed') {
      openTaskButton = (
        <Button
          sx={{ ml: 5 }}
          color="error"
          variant="contained"
          startIcon={<Replay />}
          onClick={openTaskHandler}
        >
          Открыть задачу
        </Button>
      )
    }

    taskPage = (
      <div>
        <PageHeader
          adminTask
          title={props.task.title}
          status={status}
          goBack={goBackHandler}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{
            width: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}
          >
            <ul className={classes.AdminTaskPageInfo}>
              <li className={classes.AdminTaskPageInfoItem}>
                <Typography variant="h6" fontWeight="normal">
                  Дата создания: {props.task.created_at.split('T')[0]}
                </Typography>
              </li>
              <li className={classes.AdminTaskPageInfoItem}>
                <Typography variant="h6" fontWeight="normal">
                  Описание: {props.task.description}
                </Typography>
              </li>
              <li className={classes.AdminTaskPageInfoItem}>
                <Typography variant="h6" fontWeight="normal">
                  Выборка: {dataset}
                </Typography>
              </li>
              <li className={classes.AdminTaskPageInfoItem}>
                <Typography variant="h6" fontWeight="normal">
                  Разметчик: {marker}
                </Typography>
              </li>
            </ul>
            <div className={classes.AdminTaskPageButtons}>
              <Button
                sx={{ ml: 5 }}
                variant="contained"
                startIcon={<UploadFile />}
                onClick={uploadDatasetHandler}
              >
                Скачать разметку
              </Button>
              {openTaskButton}
              {closeTaskButton}
            </div>
          </Box>
          <Box sx={{ width: '35%' }}>
            <Comments
              taskId={props.task.id}
              marker={marker}
              userId={props.userId}
            />
          </Box>
        </Box>
        {alert}
      </div>
    )
  }

  return (
    <div className={classes.AdminTaskPage}>
      {taskPage}
    </div>
  );
}

const mapStateToProps = (state) => ({
  task: state.tasks.currentTask,
  users: state.users.users,
  userId: state.auth.userId,
  datasets: state.datasets.datasets,
})

const mapDispatchToProps = (dispatch) => ({
  onGetTaskInfo: (id) => dispatch(actions.getTaskInfo(id)),
  onClearCurrentTask: () => dispatch(actions.clearCurrentTask()),
  onUploadDataset: (id, name, imagesRange) => dispatch(actions.uploadDataset(id, name, imagesRange)),
  onCloseTask: (id) => dispatch(actions.closeTask(id)),
  onOpenTask: (id) => dispatch(actions.openTask(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminTask);
