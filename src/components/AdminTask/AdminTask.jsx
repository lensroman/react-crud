import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {Box, Button, CircularProgress, Typography} from '@mui/material';
import { ArrowBackIosNewOutlined } from '@mui/icons-material';
import classes from './AdminTask.module.scss';

import * as actions from '../../Store/actions/rootAction';
import { connect } from 'react-redux';
import Comments from "../Comments/Comments";

const AdminTask = (props) => {

    const navigate = useNavigate()

    const params = useParams()

    const {onGetTaskInfo} = props

    useEffect(() => {
        let id = +params['*'].split('/')[0]
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
            justifyContent: 'center', }}
        >
            <CircularProgress />
        </Box>
    )

    if (props.task) {

        const dataset = props.datasets.find(dataset => dataset.id === props.task.dataset).name

        const marker = props.auth.markupUsers.find(user => user.id === props.task.marker).username

        const status = props.task.opened ? 'Открыта' : 'Выполнена'

        taskPage = (
            <div>
                <div className={classes.AdminTaskPageHeader}>
                    <div>
                        <Typography variant={"h4"} fontWeight={"bold"}>Задача: {props.task.title}</Typography>
                    </div>
                    <div>
                        <Typography variant={"h5"} fontWeight={"bold"}>Статус: {status}</Typography>
                    </div>
                    <div>
                        <Button
                            variant={"outlined"}
                            startIcon={<ArrowBackIosNewOutlined/>}
                            onClick={goBackHandler}
                        >
                            Назад
                        </Button>
                    </div>
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ width: '60%' }}>
                        <ul className={classes.AdminTaskPageInfo}>
                            <li className={classes.AdminTaskPageInfoItem}>
                                <Typography variant={'h6'} fontWeight={'normal'}>Дата создания: {props.task.created_at.split('T')[0]}</Typography>
                            </li>
                            <li className={classes.AdminTaskPageInfoItem}>
                                <Typography variant={'h6'} fontWeight={'normal'}>Описание: {props.task.description}</Typography>
                            </li>
                            <li className={classes.AdminTaskPageInfoItem}>
                                <Typography variant={'h6'} fontWeight={'normal'}>Выборка: {dataset}</Typography>
                            </li>
                            <li className={classes.AdminTaskPageInfoItem}>
                                <Typography variant={'h6'} fontWeight={'normal'}>Разметчик: {marker}</Typography>
                            </li>
                        </ul>
                    </Box>
                    <Box sx={{ width: '30%' }}>
                        <Comments
                            taskId={props.task.id}
                            marker={marker}
                            userId={props.auth.userId}
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
};

const mapStateToProps = state => {
    return {
        task: state.tasks.currentTask,
        auth: state.auth,
        datasets: state.datasets.datasets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetTaskInfo: (id) => dispatch(actions.getTaskInfo(id)),
        onClearCurrentTask: () => dispatch(actions.clearCurrentTask()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTask);