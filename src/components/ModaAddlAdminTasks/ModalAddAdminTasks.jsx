import React, {useEffect} from 'react';

import {Box, Button, MenuItem, Modal, TextField, Typography} from "@mui/material";
import classes from "../../containers/AdminTasks/AdminTasks.module.scss";

import {connect} from "react-redux";
import * as actions from "../../Store/actions/rootAction";

const ModalAddAdminTasks = (props) => {

    const {onFetchDataSets} = props
    const {onGetUsers} = props

    useEffect(() => {
        onFetchDataSets()
        onGetUsers()
    }, [onFetchDataSets, onGetUsers])

    let selectedDataset = null

    let count = 0

    let countSelect = []

    if (props.selectedDataset) {
        selectedDataset = props.datasets.find(dataset => dataset.id === props.selectedDataset)
        count = selectedDataset.length - selectedDataset.last_img
        for (let i = 0; i < count; i++) {
            countSelect.push(i + 1)
        }
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
                        autoComplete={'off'}
                        sx={{ width: '48%' }}
                        label={'Название задачи'}
                        value={props.title}
                        onChange={(event) => props.titleChange(event)}
                    />
                    <TextField
                        select
                        defaultValue={''}
                        label={'Кол-во изображений'}
                        sx={{width: '48%'}}
                        onChange={(event) => props.imagesCountSelect(event)}
                    >
                        {countSelect.map(count => {
                            return (
                                <MenuItem
                                    key={count}
                                    id={count}
                                    value={count}
                                >
                                    {count}
                                </MenuItem>
                            )
                        })}
                    </TextField>
                </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddAdminTasks);