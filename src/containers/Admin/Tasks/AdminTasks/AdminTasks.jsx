import React, { useEffect, useState } from 'react';

import { CircularProgress, Box } from '@mui/material';
import { connect } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import classes from './AdminTasks.module.scss';

import * as actions from '../../../../Store/actions/rootAction';

import ModalAddAdminTasks from '../../../../components/ModaAddlAdminTasks/ModalAddAdminTasks';
import AdminTaskCard from '../../../../components/AdminTaskCard/AdminTaskCard';
import CustomAlert from '../../../../components/CustomAlert/CustomAlert';
import PageHeader from '../../../../components/PageHeader/PageHeader'

function AdminTasks(props) {
  const {
    onFetchAdminTasks, onFetchAllDatasets, tasksType, onGetUsers,
  } = props

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
    onGetUsers()
    onFetchAllDatasets()
  }, [onFetchAdminTasks, onFetchAllDatasets, onGetUsers, tasksType, page])

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

  if (props.loading) {
    cards = (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (props.tasks && props.users.length > 0) {
    cards = (
      props.tasks.map((task) => {
        const marker = props.users.find((user) => user.id === task.marker).username
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
  }

  let alert = null

  if (props.error) {
    alert = <CustomAlert errors={props.error} />
  }

  return (
    <div className={classes.AdminTasks}>
      <PageHeader
        adminTasks
        tasksType={props.tasksType}
        tasksTypeToggle={tasksTypeToggleHandler}
        count={props.count}
        pageChange={pageChangeHandler}
        modalOpen={modalAddOpenHandler}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {cards}
      </Box>
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
  users: state.users.users,
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
