import React from 'react';

import {
  Button, Tab, Tabs, Typography,
} from '@mui/material'
import { Add, ArrowBackIosNewOutlined } from '@mui/icons-material'
import classes from './PageHeader.module.scss';

import PageCounter from '../PageCounter/PageCounter'

function PageHeader(props) {
  let content = null

  if (props.datasets) {
    content = (
      <div className={classes.PageHeader}>
        <div>
          <Typography variant="h4" fontWeight="bold">Обучающие выборки</Typography>
        </div>
        <PageCounter count={Math.ceil(props.count / 9)} change={props.pageChange} />
        <div>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={props.modalOpen}
          >
            Добавить выборку
          </Button>
        </div>
      </div>
    )
  }

  if (props.dataset) {
    content = (
      <div className={classes.PageHeader}>
        <div>
          <Typography variant="h4" fontWeight="bold">
            Выборка:&nbsp;
            { props.name }
          </Typography>
        </div>
        <div>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosNewOutlined />}
            onClick={props.goBack}
          >
            Назад
          </Button>
        </div>
      </div>
    )
  }

  if (props.adminTasks) {
    content = (
      <div className={classes.PageHeader}>
        <div>
          <Typography variant="h4" fontWeight="bold">Задачи</Typography>
        </div>
        <div>
          <Tabs value={props.tasksType} onChange={props.tasksTypeChange} aria-label="basic tabs example">
            <Tab label="Открытые" value="opened" />
            <Tab label="На подтверждении" value="waited" />
            <Tab label="Закрытые" value="closed" />
          </Tabs>
        </div>
        <PageCounter count={Math.ceil(props.count / 9)} change={props.pageChange} />
        <div>
          <Button
            disabled={props.tasksType !== 'opened'}
            variant="contained"
            startIcon={<Add />}
            onClick={props.modalOpen}
          >
            Создать задачу
          </Button>
        </div>
      </div>
    )
  }

  if (props.adminTask) {
    content = (
      <div className={classes.PageHeader}>
        <div>
          <Typography variant="h4" fontWeight="bold">
            Задача:&nbsp;
            {props.title}
          </Typography>
        </div>
        <div>
          <Typography variant="h5" fontWeight="bold">
            Статус:&nbsp;
            {props.status}
          </Typography>
        </div>
        <div>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosNewOutlined />}
            onClick={props.goBack}
          >
            Назад
          </Button>
        </div>
      </div>
    )
  }

  if (props.markupTask) {
    content = (
      <div className={classes.PageHeader}>
        <div>
          <Typography variant="h4" fontWeight="bold">Задача: {props.title}</Typography>
        </div>
        <div>
          <Typography variant="h5" fontWeight="bold">Статус: {props.status}</Typography>
        </div>
        <div>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosNewOutlined />}
            onClick={props.goBack}
          >
            Назад
          </Button>
        </div>
      </div>
    )
  }

  if (props.markupTasks) {
    content = (
      <div className={classes.PageHeader}>
        <div>
          <Typography variant="h4" fontWeight="bold">Ваши задачи</Typography>
        </div>
        <div>
          <Tabs value={props.tasksType} onChange={props.tasksTypeChange} aria-label="basic tabs example">
            <Tab label="Открытые" value="opened" />
            <Tab label="На подтверждении" value="waited" />
            <Tab label="Закрытые" value="closed" />
          </Tabs>
        </div>
        <PageCounter count={Math.ceil(props.count / 9)} change={props.pageChange} />
      </div>
    )
  }

  if (props.users) {
    content = (
      <div className={classes.PageHeader}>
        <div>
          <Typography variant="h4" fontWeight="bold">Пользователи</Typography>
        </div>
        <div>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={props.modalOpen}
          >
            Добавить пользователя
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default PageHeader;
