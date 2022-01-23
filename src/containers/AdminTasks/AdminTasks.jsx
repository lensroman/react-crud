import React, {useEffect, useState} from 'react';

import classes from './AdminTasks.module.scss';
import {Button, Typography} from '@mui/material';
import {Add} from '@mui/icons-material';

import * as actions from '../../Store/actions/rootAction';
import {connect} from 'react-redux';

import ModalAddAdminTasks from "../../components/ModaAddlAdminTasks/ModalAddAdminTasks";
import TaskCard from '../../components/TaskCard/TaskCard';
import { useNavigate, Outlet } from "react-router-dom";

const AdminTasks = (props) => {

    const {onFetchAdminTasks} = props

    const {datasets} = props

    useEffect( () => {
        onFetchAdminTasks()
    }, [onFetchAdminTasks])

    const [newTask, setNewTask] = useState({
        dataset: {},
        marker: {},
        title: null,
        description: null
    })

    const [modalAddOpen, setModalAddOpen] = useState(false)

    const navigate = useNavigate()

    const modalAddOpenHandler = () => {
        setModalAddOpen(true)
    }
    const modalAddCloseHandler = () => {
        setModalAddOpen(false)
    }

    const datasetSelectHandler = (event) => {
        const updatedNewTask = {
            ...newTask,
            dataset: event.target.value
        }
        setNewTask(updatedNewTask)
    }

    const markupSelectHandler = (event) => {
        const updatedNewTask = {
            ...newTask,
            marker: event.target.value
        }
        setNewTask(updatedNewTask)
    }

    const titleChangeHandler = (event) => {
        const updatedNewTask = {
            ...newTask,
            title: event.target.value
        }
        setNewTask(updatedNewTask)
    }

    const descriptionChangeHandler = (event) => {
        const updatedNewTask = {
            ...newTask,
            description: event.target.value
        }
        setNewTask(updatedNewTask)
    }

    const submitNewTaskHandler = () => {
        modalAddCloseHandler()
        props.onAddAdminTask(newTask)
    }

    const taskDeleteHandler = (id) => {
        props.onDeleteAdminTask(id)
    }

    const changeRouteHandler = (id) => {
        let path = `/admin-tasks/${id}/`
        navigate(path)
    }

    let cards = null

    if (props.tasks && props.markupUsers.length > 0) {
        cards = (
            props.tasks.map(task => {
                const marker = props.markupUsers.filter(user => user.id === task.marker)[0].username
                const dataset = props.datasets.filter(dataset => dataset.id === task.dataset)[0].name
                return (
                    <TaskCard
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

    return (
        <div className={classes.AdminTasks}>
            <div className={classes.AdminTasksHeader}>
                <div>
                    <Typography variant={"h4"} fontWeight={"bold"}>Задачи</Typography>
                </div>
                <div>
                    <Button
                        variant={"contained"}
                        startIcon={<Add/>}
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
                markerSelect={markupSelectHandler}
                titleChange={titleChangeHandler}
                descriptionChange={descriptionChangeHandler}
                submitNewTask={submitNewTaskHandler}
            />
            <Outlet />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.adminTasks,
        markupUsers: state.auth.markupUsers,
        datasets: state.datasets.datasets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAdminTasks: () => dispatch(actions.fetchAdminTasks()),
        onAddAdminTask: (task) => dispatch(actions.addAdminTask(task)),
        onDeleteAdminTask: (id) => dispatch(actions.deleteAdminTask(id)),
        onGetUsers: () => dispatch(actions.getUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTasks);
