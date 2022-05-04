import React from 'react';

import {
  Box,
  Button, MenuItem, Tab, Tabs, TextField, Typography,
} from '@mui/material'
import {
  Add, ArrowBackIosNewOutlined, NavigateBefore, NavigateNext,
} from '@mui/icons-material'
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
            {props.name}
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

  if (props.imagesViewer) {
    const numberNames = []

    if (props.datasetNames) {
      let number = 0
      props.datasetNames.forEach((name) => {
        numberNames.push({
          name,
          value: number,
        })
        number += 1
      })
    }

    content = (
      <div className={classes.PageHeader}>
        <Box>
          <Typography variant="h4" fontWeight="bold">Изображения {props.datasetName}</Typography>
        </Box>
        <Box sx={{ width: '10%' }}>
          <TextField
            fullWidth
            select
            label="Тип изображения"
            value={props.imgType}
            onChange={props.selectImageType}
          >
            {props.datasetExtensions && props.imgTypes.map((type) => (
              <MenuItem
                key={type.key}
                value={type.label}
                disabled={!props.datasetExtensions[type.label]}
              >
                {type.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box>
          <Button
            startIcon={<NavigateBefore />}
            disabled={!props.imgType || props.number === 0}
            onClick={props.prevImage}
          >
            Предыдущее
          </Button>
          <Button
            endIcon={<NavigateNext />}
            disabled={!props.imgType || props.number === props.length}
            onClick={props.nextImage}
          >
            Следующее
          </Button>
        </Box>
        <Box sx={{ width: '10%' }}>
          <TextField
            disabled={!props.imgType}
            fullWidth
            select
            label="Перейти к изображению"
            value={props.number}
            onChange={props.selectImageNumber}
            SelectProps={{
              MenuProps: {
                sx: {
                  maxHeight: 500,
                },
              },
            }}
          >
            {props.datasetNames && numberNames.map((el) => (
              <MenuItem
                key={el.name}
                value={el.value}
              >
                {el.value + 1}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosNewOutlined />}
            onClick={props.goBack}
          >
            Назад
          </Button>
        </Box>
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
