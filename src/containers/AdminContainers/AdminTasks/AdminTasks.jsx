import React, {useEffect, useState} from 'react';

import classes from './AdminTasks.module.scss';
import Task from '../../../components/Task/Task';
import {Button, Typography} from '@mui/material';
import {Add} from '@mui/icons-material';

import * as actions from '../../../Store/actions/rootAction';
import {connect} from 'react-redux';
import ModalAdminTasks from "../../../components/ModalAdminTasks/ModalAdminTasks";

const AdminTasks = (props) => {

    const {onFetchAdminTasks, onGetUsers} = props

    useEffect( () => {
        onFetchAdminTasks()
    }, [onFetchAdminTasks, onGetUsers])

    const {datasets} = props

    const [newTask, setNewTask] = useState({
        dataset: {},
        marker: {},
        title: null,
        description: null
    })

    const [modalOpen, setModalOpen] = useState(false)

    const modalOpenHandler = () => {
        setModalOpen(true)
    }
    const modalCloseHandler = () => {
        setModalOpen(false)
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
        modalCloseHandler()
        props.onAddAdminTask(newTask)
    }

    let cards = null

    if (props.tasks && props.markupUsers.length > 0) {
        cards = (
            props.tasks.map(task => {
                const marker = props.markupUsers.filter(user => user.id === task.marker)[0].username
                return (
                    <Task
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        marker={marker}
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
                        onClick={modalOpenHandler}
                    >
                        Создать задачу
                    </Button>
                </div>
            </div>
            {cards}
            <ModalAdminTasks
                modalOpen={modalOpen}
                modalClose={modalCloseHandler}
                datasetSelect={datasetSelectHandler}
                datasets={datasets}
                markerSelect={markupSelectHandler}
                titleChange={titleChangeHandler}
                descriptionChange={descriptionChangeHandler}
                submitNewTask={submitNewTaskHandler}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.adminTasks,
        markupUsers: state.auth.markupUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAdminTasks: () => dispatch(actions.fetchAdminTasks()),
        onAddAdminTask: (task) => dispatch(actions.addAdminTask(task)),
        onGetUsers: () => dispatch(actions.getUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTasks);
