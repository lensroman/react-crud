import React, {useEffect} from 'react';

import {Box, Button, MenuItem, Modal, TextField, Typography} from "@mui/material";
import classes from "../../containers/AdminTasks/AdminTasks.module.scss";

import {connect} from "react-redux";
import * as actions from "../../Store/actions/rootAction";

const ModalAddAdminTasks = (props) => {

    const { onGetUsers, onFetchAllDatasets } = props

    useEffect(() => {
        onFetchAllDatasets()
        onGetUsers()
    }, [onGetUsers, onFetchAllDatasets])

    let count = 0

    if (props.selectedDataset) {
        const selectedDataset = props.datasets.find(dataset => dataset.id === props.selectedDataset)
        count = selectedDataset.length - selectedDataset.last_img
    }

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
                        required={true}
                        fullWidth
                        label={'Выборка'}
                        select
                        defaultValue={''}
                        sx={{width: '48%'}}
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
                        required={true}
                        select
                        defaultValue={''}
                        label={'Разметчик'}
                        sx={{width: '48%'}}
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
                <Box className={classes.ModalInputs} sx={{ mb: 1 }}>
                    <TextField
                        helperText={' '}
                        required={true}
                        autoComplete={'off'}
                        sx={{ width: '48%' }}
                        label={'Название задачи'}
                        value={props.title}
                        onChange={(event) => props.titleChange(event)}
                    />
                    <TextField
                        helperText={`От 0 до ${count}`}
                        required={true}
                        autoComplete={'off'}
                        label={'Кол-во изображений'}
                        sx={{width: '48%'}}
                        value={props.count}
                        onChange={(event) => props.imagesCountChange(event)}
                    />
                </Box>
                <TextField
                    required={true}
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
        onFetchAllDatasets: () => dispatch(actions.fetchAllDatasets()),
        onGetUsers: () => dispatch(actions.getUsers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddAdminTasks);