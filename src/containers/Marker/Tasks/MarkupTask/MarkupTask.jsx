import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { ArrowBackIosNewOutlined, Done, UploadFile } from '@mui/icons-material';

import { connect } from 'react-redux';
import classes from './MarkupTask.module.scss';
import * as actions from '../../../../Store/actions/rootAction';

import CloseTaskDialog from '../../../../components/CloseTaskDialog/CloseTaskDialog';
import Comments from '../../../Comments/Comments';
import CustomAlert from '../../../../components/CustomAlert/CustomAlert';

function MarkupTask(props) {
  const [openDialog, setOpenDialog] = useState(false)

  const [taskCloseComment, setTaskCloseComment] = useState('')
  const [taskCloseFile, setTaskCloseFile] = useState('')

  const navigate = useNavigate()

  const params = useParams()

  const { onGetTaskInfo } = props

  useEffect(() => {
    const id = +params['*'].split('/')[0]
    onGetTaskInfo(id)
  }, [onGetTaskInfo, params])

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

  const openDialogHandler = () => {
    setOpenDialog(true)
  }

  const closeDialogHandler = () => {
    setOpenDialog(false)
  }

  const commentChangeHandler = (event) => {
    const updatedTaskCloseComment = event.target.value
    setTaskCloseComment(updatedTaskCloseComment)
  }

  const markupFileAddHandler = (event) => {
    const updatedTaskCloseFile = event.target.files[0]
    setTaskCloseFile(updatedTaskCloseFile)
  }

  const closeTaskHandler = () => {
    closeDialogHandler()
    const taskCloseData = {
      task: props.task,
      file: taskCloseFile,
    }
    props.onCompleteTask(taskCloseData, taskCloseComment)
  }

  let taskPage = (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <CircularProgress />
    </Box>
  )

  let closeTaskButton = null

  if (props.task && props.task.opened === true) {
    closeTaskButton = (
      <Button
        sx={{ ml: 2 }}
        variant="contained"
        color="success"
        startIcon={<Done />}
        onClick={openDialogHandler}
      >
        Закрыть задачу
      </Button>
    )
  }

  let alert = null

  if (props.error) {
    alert = <CustomAlert errors={props.error} />
  }

  if (props.task) {
    const dataset = props.task.dataset.name

    const status = props.task.opened ? 'Открыта' : 'Выполнена'

    taskPage = (
      <div>
        {alert}
        <div className={classes.MarkupTaskPageHeader}>
          <div>
            <Typography variant="h4" fontWeight="bold">Задача: {props.task.title}</Typography>
          </div>
          <div>
            <Typography variant="h5" fontWeight="bold">Статус: {status}</Typography>
          </div>
          <div>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIosNewOutlined />}
              onClick={goBackHandler}
            >
              Назад
            </Button>
          </div>
        </div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box className={classes.MarkupTaskPageContent} sx={{ width: '60%' }}>
            <div>
              <ul className={classes.MarkupTaskPageInfo}>
                <li className={classes.MarkupTaskPageInfoItem}>
                  <Typography variant="h6" fontWeight="normal">Дата
                    создания: {props.task.created_at.split('T')[0]}
                  </Typography>
                </li>
                <li className={classes.MarkupTaskPageInfoItem}>
                  <Typography variant="h6" fontWeight="normal">Выборка: {dataset}</Typography>
                </li>
                <li className={classes.MarkupTaskPageInfoItem}>
                  <Typography
                    variant="h6"
                    fontWeight="normal"
                  >Описание: {props.task.description}
                  </Typography>
                </li>
                <li className={classes.MarkupTaskPageInfoItem}>
                  <Typography variant="h6" fontWeight="normal">Количество
                    изображений: {props.task.images_count}
                  </Typography>
                </li>
              </ul>
            </div>
            <div className={classes.MarkupTaskPageButtons}>
              <Button
                sx={{ ml: 5 }}
                variant="contained"
                startIcon={<UploadFile />}
                onClick={uploadDatasetHandler}
              >
                Скачать выборку
              </Button>
              {closeTaskButton}
            </div>
          </Box>
          <Box sx={{ width: '35%' }}>
            <Comments
              taskId={props.task.id}
              userId={props.user}
            />
          </Box>
        </Box>
        <CloseTaskDialog
          open={openDialog}
          close={closeDialogHandler}
          markupAddFile={markupFileAddHandler}
          comment={taskCloseComment}
          changeComment={commentChangeHandler}
          closeDialog={closeDialogHandler}
          closeTask={closeTaskHandler}
        />
      </div>
    )
  }

  return (
    <div className={classes.MarkupTaskPage}>
      {taskPage}
    </div>
  );
}

const mapStateToProps = (state) => ({
  task: state.tasks.currentTask,
  user: state.auth.userId,
  error: state.tasks.error,
})

const mapDispatchToProps = (dispatch) => ({
  onGetTaskInfo: (id) => dispatch(actions.getTaskInfo(id)),
  onClearCurrentTask: () => dispatch(actions.clearCurrentTask()),
  onUploadDataset: (id, name, imagesRange) => {
    dispatch(actions.uploadDataset(id, name, imagesRange))
  },
  onCompleteTask: (data, comment) => dispatch(actions.completeTask(data, comment)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MarkupTask);
