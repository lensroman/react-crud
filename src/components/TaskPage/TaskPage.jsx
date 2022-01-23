import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { Button, CircularProgress, Typography } from "@mui/material";
import { ArrowBackIosNewOutlined } from "@mui/icons-material";
import classes from './TaskPage.module.scss';

import * as actions from '../../Store/actions/rootAction';
import { connect } from 'react-redux';

const TaskPage = (props) => {

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
        <div style={{
            marginTop: '200px',
            display: 'flex',
            justifyContent: 'center', }}
        >
            <CircularProgress />
        </div>
    )

    if (props.task) {

        const dataset = props.datasets.filter(dataset => dataset.id === props.task.dataset)[0].name

        const marker = props.markupUsers.filter(user => user.id === props.task.marker)[0].username

        taskPage = (
            <div>
                <div className={classes.TaskPageHeader}>
                    <div>
                        <Typography variant={"h4"} fontWeight={"bold"}>Задача: {props.task.title}</Typography>
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
                <ul className={classes.TaskPageInfo}>
                    <li className={classes.TaskPageInfoItem}>
                        <Typography variant={'h6'} fontWeight={'normal'}>Дата создания: {props.task.created_at.split('T')[0]}</Typography>
                    </li>
                    <li className={classes.TaskPageInfoItem}>
                        <Typography variant={'h6'} fontWeight={'normal'}>Описание: {props.task.description}</Typography>
                    </li>
                    <li className={classes.TaskPageInfoItem}>
                        <Typography variant={'h6'} fontWeight={'normal'}>Выборка: {dataset}</Typography>
                    </li>
                    <li className={classes.TaskPageInfoItem}>
                        <Typography variant={'h6'} fontWeight={'normal'}>Разметчик: {marker}</Typography>
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div className={classes.TaskPage}>
            {taskPage}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        task: state.tasks.currentTask,
        markupUsers: state.auth.markupUsers,
        datasets: state.datasets.datasets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetTaskInfo: (id) => dispatch(actions.getTaskInfo(id)),
        onClearCurrentTask: () => dispatch(actions.clearCurrentTask())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);