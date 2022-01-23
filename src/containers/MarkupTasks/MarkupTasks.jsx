import React, {useEffect} from 'react';

import TaskCard from "../../components/TaskCard/TaskCard";
import {CircularProgress} from "@mui/material";
import classes from './MarkupTasks.module.scss'

import * as actions from '../../Store/actions/rootAction';
import {connect} from "react-redux";

const MarkupTasks = (props) => {

    const {onFetchAdminTasks} = props

    useEffect(() => {
        onFetchAdminTasks()
    }, [onFetchAdminTasks])

    let cards = <CircularProgress />

    if (props.tasks) {
        let tasks = props.tasks.filter(task => task.marker === props.userId)
        cards = tasks.map(task => {
            return (
                <TaskCard
                    key={task.id}
                    title={task.title}
                    description={task.description}
                />
            )
        })
        console.log(tasks)
    }

    return (
        <div className={classes.MarkupTasks}>
            {cards}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tasks: state.tasks.adminTasks,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAdminTasks: () => dispatch(actions.fetchAdminTasks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkupTasks);