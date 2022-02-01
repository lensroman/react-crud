import React, {useEffect, useState} from 'react';

import classes from './AdminTasks.module.scss';
import {Button, CircularProgress, Typography, Box} from '@mui/material';
import {Add} from '@mui/icons-material';

import * as actions from '../../Store/actions/rootAction';
import {connect} from 'react-redux';

import ModalAddAdminTasks from "../../components/ModaAddlAdminTasks/ModalAddAdminTasks";
import AdminTaskCard from '../../components/AdminTaskCard/AdminTaskCard';
import { useNavigate, Outlet } from "react-router-dom";

const AdminTasks = (props) => {

    const {onFetchAdminTasks, tasksType} = props

    const {datasets} = props

    const [newTask, setNewTask] = useState({
        dataset: null,
        marker: null,
        imagesCount: null,
        title: null,
        description: null
    })

    const [modalAddOpen, setModalAddOpen] = useState(false)

    const navigate = useNavigate()

    useEffect( () => {
        onFetchAdminTasks(tasksType)
    }, [onFetchAdminTasks, tasksType])

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

    const imagesCountChangeHandler = (event) => {
        const updatedNewTask = {
            ...newTask,
            imagesCount: event.target.value
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

    const tasksTypeToggleHandler = () => {
        props.onChangeTasksType()
    }

    let cards = null

    if (props.loading) {
        cards = (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <CircularProgress />
            </Box>
        )
    }

    if (props.tasks && props.markupUsers.length > 0 && props.datasets.length > 0) {
        cards = (
            props.tasks.map(task => {
                const marker = props.markupUsers.find(user => user.id === task.marker).username
                const dataset = props.datasets.find(dataset => dataset.id === task.dataset).name
                return (
                    <AdminTaskCard
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
                <div>
                    <Button
                        disabled={!props.tasksType}
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
                selectedDataset={newTask.dataset}
                markerSelect={markupSelectHandler}
                titleChange={titleChangeHandler}
                descriptionChange={descriptionChangeHandler}
                imagesCountSelect={imagesCountChangeHandler}
                submitNewTask={submitNewTaskHandler}
            />
            <Outlet />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks.adminTasks,
        loading: state.tasks.loading,
        markupUsers: state.auth.markupUsers,
        datasets: state.datasets.datasets,
        tasksType: state.tasks.tasksType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAdminTasks: (tasksType) => dispatch(actions.fetchAdminTasks(tasksType)),
        onAddAdminTask: (task) => dispatch(actions.addAdminTask(task)),
        onDeleteAdminTask: (id) => dispatch(actions.deleteAdminTask(id)),
        onGetUsers: () => dispatch(actions.getUsers()),
        onChangeTasksType: () => dispatch(actions.changeTasksType())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTasks);
