import React, {useEffect} from 'react';

import MarkupTaskCard from "../../components/MarkupTaskCard/MarkupTaskCard";

import {CircularProgress, Typography} from "@mui/material";
import classes from './MarkupTasks.module.scss'

import * as actions from '../../Store/actions/rootAction';
import {connect} from "react-redux";

import {useNavigate} from "react-router-dom";

const MarkupTasks = (props) => {

    const navigate = useNavigate()

    const {onFetchAdminTasks, onFetchDatasets} = props

    useEffect(() => {
        onFetchDatasets()
        onFetchAdminTasks()
    }, [onFetchAdminTasks, onFetchDatasets])

    const openTaskHandler = (id) => {
        let path = `/markup-tasks/${id}/`
        navigate(path)
    }

    let cards = <CircularProgress sx={{ mt: 4 }} />

    if (props.tasks && props.datasets) {
        let tasks = props.tasks.filter(task => task.marker === props.userId)
            .filter(task => task.opened === true)
        console.log(props.datasets)
        cards = tasks.map(task => {
            const dataset = props.datasets.find(dataset => dataset.id === task.dataset).name
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
                    <Typography variant={"h4"} fontWeight={"bold"}>Ваши открытые задачи</Typography>
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
        datasets: state.datasets.datasets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAdminTasks: () => dispatch(actions.fetchAdminTasks()),
        onFetchDatasets: () => dispatch(actions.fetchDatasets())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkupTasks);