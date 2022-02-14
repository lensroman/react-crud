import React, { useEffect, useState } from 'react';

import { Button, CircularProgress, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MarkupTaskCard from '../../../../components/MarkupTaskCard/MarkupTaskCard';

import classes from './MarkupTasks.module.scss'

import * as actions from '../../../../Store/actions/rootAction';

import PageCounter from '../../../../components/PageCounter/PageCounter';

function MarkupTasks(props) {
  const [page, setPage] = useState({
    limit: 9,
    offset: 0,
  })

  const navigate = useNavigate()

  const { onFetchAdminTasks, tasksType } = props

  useEffect(() => {
    onFetchAdminTasks(tasksType, page)
  }, [onFetchAdminTasks, tasksType, page])

  const openTaskHandler = (id) => {
    const path = `/markup-tasks/${id}/`
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

  let cards = (
    <CircularProgress sx={{ mt: 4 }} />
  )

  let pagination = null

  if (props.tasks) {
    const tasks = props.tasks.filter((task) => task.marker === props.userId)

    cards = tasks.map((task) => {
      const dataset = task.dataset.name

      return (
        <MarkupTaskCard
          key={task.id}
          title={task.title}
          dataset={dataset}
          count={task.images_count}
          description={task.description}
          openTask={() => openTaskHandler(task.id)}
        />
      )
    })

    pagination = (
      <PageCounter count={Math.ceil(props.count / 10)} change={pageChangeHandler} />
    )
  }

  return (
    <div className={classes.MarkupTasks}>
      <div className={classes.MarkupTasksHeader}>
        <div>
          <Typography variant="h4" fontWeight="bold">Ваши задачи</Typography>
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
      </div>
      {cards}
    </div>
  );
}

const mapStateToProps = (state) => ({
  count: state.tasks.count,
  tasks: state.tasks.adminTasks,
  userId: state.auth.userId,
  tasksType: state.tasks.tasksType,
})

const mapDispatchToProps = (dispatch) => ({
  onFetchAllDatasets: () => dispatch(actions.fetchAllDatasets()),
  onFetchAdminTasks: (type, page) => dispatch(actions.fetchAdminTasks(type, page)),
  onChangeTasksType: () => dispatch(actions.changeTasksType()),
  onGetDatasetInfo: (id) => dispatch(actions.getDatasetInfo(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MarkupTasks);
