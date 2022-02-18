import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Box, CircularProgress, Typography,
} from '@mui/material';
import { connect } from 'react-redux';
import classes from './AdminTask.module.scss';

import * as actions from '../../../../Store/actions/rootAction';
import Comments from '../../../Comments/Comments';
import PageHeader from '../../../../components/PageHeader/PageHeader'

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

    const marker = props.users.find((user) => user.id === props.task.marker).username

    const status = props.task.opened ? 'Открыта' : 'Выполнена'

    taskPage = (
      <div>
        <PageHeader
          adminTask
          title={props.task.title}
          status={status}
          goBack={goBackHandler}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ width: '60%' }}>
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
          </Box>
          <Box sx={{ width: '35%' }}>
            <Comments
              taskId={props.task.id}
              marker={marker}
              userId={props.userId}
            />
          </Box>
        </Box>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminTask);
