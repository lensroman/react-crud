import React, { useEffect, useState } from 'react';

import {
  Button, CircularProgress, Typography, Box,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { connect } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import classes from './AdminTasks.module.scss';

import * as actions from '../../../../Store/actions/rootAction';

import ModalAddAdminTasks from '../../../../components/ModaAddlAdminTasks/ModalAddAdminTasks';
import AdminTaskCard from '../../../../components/AdminTaskCard/AdminTaskCard';
import CustomAlert from '../../../../components/CustomAlert/CustomAlert';
import PageCounter from '../../../../components/PageCounter/PageCounter';

function AdminTasks(props) {
  const { onFetchAdminTasks, tasksType } = props

  const { datasets } = props

  const [newTask, setNewTask] = useState({
    dataset: null,
    marker: null,
    imagesCount: '',
    title: null,
    description: null,
  })

  const [modalAddOpen, setModalAddOpen] = useState(false)

  const [page, setPage] = useState({
    limit: 9,
    offset: 0,
  })

  const navigate = useNavigate()

  useEffect(() => {
    onFetchAdminTasks(tasksType, page)
  }, [onFetchAdminTasks, tasksType, page])

  const modalAddOpenHandler = () => {
    setModalAddOpen(true)
  }

  const modalAddCloseHandler = () => {
    setModalAddOpen(false)
  }

  const datasetSelectHandler = (event) => {
    const updatedNewTask = {
      ...newTask,
      dataset: event.target.value,
    }
    setNewTask(updatedNewTask)
  }

  const markupSelectHandler = (event) => {
    const updatedNewTask = {
      ...newTask,
      marker: event.target.value,
    }
    setNewTask(updatedNewTask)
  }

  const titleChangeHandler = (event) => {
    const updatedNewTask = {
      ...newTask,
      title: event.target.value,
    }
    setNewTask(updatedNewTask)
  }

  const descriptionChangeHandler = (event) => {
    const updatedNewTask = {
      ...newTask,
      description: event.target.value,
    }
    setNewTask(updatedNewTask)
  }

  const imagesCountChangeHandler = (event) => {
    const reg = /^\d+$/
    if (event.target.value === '' || reg.test(event.target.value)) {
      const updatedNewTask = {
        ...newTask,
        imagesCount: event.target.value,
      }
      setNewTask(updatedNewTask)
    }
  }

  const submitNewTaskHandler = () => {
    modalAddCloseHandler()
    props.onAddAdminTask(newTask, page)
  }

  const taskDeleteHandler = (id) => {
    props.onDeleteAdminTask(id, page)
  }

  const changeRouteHandler = (id) => {
    const path = `/admin-tasks/${id}/`
    navigate(path)
  }

  const tasksTypeToggleHandler = () => {
    props.onChangeTasksType()
  }

  const pageChangeHandler = (event, value) => {
    setPage({
      limit: 9,
      offset: (9 * value - 9),
    })
  }

  let cards = null

  let pagination = null

  if (props.loading) {
    cards = (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (props.tasks && props.markupUsers.length > 0) {
    cards = (
      props.tasks.map((task) => {
        const marker = props.markupUsers.find((user) => user.id === task.marker).username
        const dataset = task.dataset.name
        return (
          <AdminTaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            delete={() => taskDeleteHandler(task.id)}
            openTask={() => changeRouteHandler(task.id)}
            marker={marker}
            dataset={dataset}
          />
        )
      })
    )

    pagination = (
      <PageCounter count={Math.ceil(props.count / 10)} change={pageChangeHandler} />
    )
  }

  let alert = null

  if (props.error) {
    alert = <CustomAlert errors={props.error} />
  }

  return (
    <div className={classes.AdminTasks}>
      <div className={classes.AdminTasksHeader}>
        <div>
          <Typography variant="h4" fontWeight="bold">Задачи</Typography>
        </div>
        <div>
          <Button
            disabled={props.tasksType}
            variant="outlined"
            onClick={tasksTypeToggleHandler}
          >
            Открытые
          </Button>
          <Button
            disabled={!props.tasksType}
            variant="outlined"
            onClick={tasksTypeToggleHandler}
          >
            Закрытые
          </Button>
        </div>
        {pagination}
        <div>
          <Button
            disabled={!props.tasksType}
            variant="contained"
            startIcon={<Add />}
            onClick={modalAddOpenHandler}
          >
            Создать задачу
          </Button>
        </div>
      </div>
      {cards}
      <ModalAddAdminTasks
        modalOpen={modalAddOpen}
        modalClose={modalAddCloseHandler}
        datasetSelect={datasetSelectHandler}
        datasets={datasets}
        selectedDataset={newTask.dataset}
        markerSelect={markupSelectHandler}
        titleChange={titleChangeHandler}
        descriptionChange={descriptionChangeHandler}
        imagesCountChange={imagesCountChangeHandler}
        count={newTask.imagesCount}
        submitNewTask={submitNewTaskHandler}
      />
      {alert}
      <Outlet />
    </div>
  )
}

const mapStateToProps = (state) => ({
  count: state.tasks.count,
  tasks: state.tasks.adminTasks,
  loading: state.tasks.loading,
  markupUsers: state.auth.markupUsers,
  tasksType: state.tasks.tasksType,
  error: state.tasks.error,
})

const mapDispatchToProps = (dispatch) => ({
  onFetchAllDatasets: () => dispatch(actions.fetchAllDatasets()),
  onFetchAdminTasks: (tasksType, page) => dispatch(actions.fetchAdminTasks(tasksType, page)),
  onAddAdminTask: (task, page) => dispatch(actions.addAdminTask(task, page)),
  onDeleteAdminTask: (id, page) => dispatch(actions.deleteAdminTask(id, page)),
  onGetUsers: () => dispatch(actions.getUsers()),
  onChangeTasksType: () => dispatch(actions.changeTasksType()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminTasks);
