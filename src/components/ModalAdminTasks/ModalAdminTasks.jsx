import React, {useEffect} from 'react';

import {Box, Button, MenuItem, Modal, TextField, Typography} from "@mui/material";
import classes from "../../containers/AdminContainers/AdminTasks/AdminTasks.module.scss";

import {connect} from "react-redux";
import * as actions from "../../Store/actions/rootAction";

const ModalAdminTasks = (props) => {

    const {onFetchDataSets} = props
    const {onGetUsers} = props

    useEffect(() => {
        onFetchDataSets()
        onGetUsers()
    }, [onFetchDataSets, onGetUsers])

    return (
        <Modal
            open={props.modalOpen}
            onClose={props.modalClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box fullWidth={true} className={classes.AdminTasksModal}>
                <Typography variant={'h6'}>Создайте новую задачу</Typography>
                <Box className={classes.ModalInputs}>
                    <TextField
                        fullWidth
                        label={'Выборка'}
                        select
                        defaultValue={''}
                        sx={{ width: '48%' }}
                        value={props.dataset}
                        onChange={(event) => props.datasetSelect(event)}
                    >
                        {props.datasets.map(dataset => {
                            return (
                                <MenuItem
                                    key={dataset.id}
                                    id={dataset.id}
                                    value={dataset.id}
                                >
                                    {dataset.name}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                    <TextField
                        select
                        defaultValue={''}
                        label={'Разметчик'}
                        sx={{ width: '48%' }}
                        onChange={(event) => props.markerSelect(event)}
                    >
                        {props.markupUsers.map(user => {
                            return (
                                <MenuItem
                                    key={user.id}
                                    id={user.id}
                                    value={user.id}
                                >
                                    {user.username}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </Box>
                <TextField
                    autoComplete={'off'}
                    fullWidth
                    label={'Название задачи'}
                    value={props.title}
                    onChange={(event) => props.titleChange(event)}
                />
                <TextField
                    autoComplete={'off'}
                    fullWidth
                    label={'Описание'}
                    multiline={true}
                    value={props.description}
                    onChange={(event) => props.descriptionChange(event)}
                />
                <Button onClick={props.submitNewTask}>Создать</Button>
            </Box>
        </Modal>
    )
};

const mapStateToProps = state => {
    return {
        datasets: state.datasets.datasets,
        markupUsers: state.auth.markupUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUsers: () => dispatch(actions.getUsers()),
        onFetchDataSets: () => dispatch(actions.fetchDatasets())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAdminTasks);