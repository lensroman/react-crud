import React, { useEffect } from 'react';

import MarkupTaskCard from "../../components/MarkupTaskCard/MarkupTaskCard";

import { Button, CircularProgress, Typography } from "@mui/material";
import classes from './MarkupTasks.module.scss'

import * as actions from '../../Store/actions/rootAction';
import { connect } from "react-redux";

import { useNavigate } from "react-router-dom";

const MarkupTasks = (props) => {

    const navigate = useNavigate()

    const {onFetchAdminTasks, onFetchDatasets, tasksType} = props

    useEffect( () => {
        onFetchDatasets()
        onFetchAdminTasks(tasksType)
    }, [onFetchAdminTasks, onFetchDatasets, tasksType])

    const openTaskHandler = (id) => {
        let path = `/markup-tasks/${id}/`
        navigate(path)
    }

    const tasksTypeToggleHandler = () => {
        props.onChangeTasksType()
    }

    let cards = <CircularProgress sx={{ mt: 4 }} />

    if (props.tasks && props.datasets.length > 0) {
        let dataset = null
        let tasks = props.tasks.filter(task => task.marker === props.userId)
        cards = tasks.map(task => {
            dataset = props.datasets.find(dataset => dataset.id === task.dataset).name
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
    }

    return (
        <div className={classes.MarkupTasks}>
            <div className={classes.MarkupTasksHeader}>
                <div>
                    <Typography variant={"h4"} fontWeight={"bold"}>Ваши задачи</Typography>
                </div>
                <div>
                    <Button
                        disabled={props.tasksType}
                        variant={'outlined'}
                        onClick={tasksTypeToggleHandler}
                    >
                        Открытые
                    </Button>
                    <Button
                        disabled={!props.tasksType}
                        variant={'outlined'}
                        onClick={tasksTypeToggleHandler}
                    >
                        Закрытые
                    </Button>
                </div>
            </div>
            {cards}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tasks: state.tasks.adminTasks,
        userId: state.auth.userId,
        datasets: state.datasets.datasets,
        tasksType: state.tasks.tasksType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAdminTasks: (type) => dispatch(actions.fetchAdminTasks(type)),
        onFetchDatasets: () => dispatch(actions.fetchDatasets()),
        onChangeTasksType: () => dispatch(actions.changeTasksType())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkupTasks);