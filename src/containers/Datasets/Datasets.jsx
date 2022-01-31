import React, { useEffect, useRef, useState } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../Store/actions/rootAction';

import classes from './Datasets.module.scss';
import DatasetCard from '../../components/DatasetCard/DatasetCard';
import { Box, Button, CircularProgress, Modal, TextField, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

import {useNavigate} from "react-router-dom";

const Datasets = props => {

    const [modalOpen, setModalOpen] = useState(false)
    const [datasetName, setDatasetName] = useState('')
    const [datasetDescription, setDatasetDescription] = useState('')
    const [datasetFile, setDatasetFile] = useState(null)

    const {onFetchDatasets} = props

    useEffect(() => {
        onFetchDatasets()
    }, [onFetchDatasets])

    const downloadButton = useRef(null)

    const navigate = useNavigate()

    let cards = null

    const modalOpenHandler = () => {
        setModalOpen(true)
    }
    const modalCloseHandler = () => {
        setModalOpen(false)
    }

    const inputNameChangeHandler = (event) => {
        let newName = event.target.value
        setDatasetName(newName)
    }

    const inputDescriptionChangeHandler = (event) => {
        let newDescription = event.target.value
        setDatasetDescription(newDescription)
    }

    const fileAddHandler = (event) => {
        let newFile = event.target.files[0]
        setDatasetFile(newFile)
    }

    const addDataSetHandler = (event) => {
        event.preventDefault()
        modalCloseHandler()
        props.onAddDataset(datasetName, datasetDescription, datasetFile)
    }

    const deleteDataSetHandler = (id) => {
        props.onDeleteDataset(id)
    }

    const downloadButtonHandler = () => {
        downloadButton.current.click()
    }

    const changeRouteHandler = (id) => {
        let path = `/samples/${id}/`
        navigate(path)
    }

    let modal = (
        <Modal
            open={modalOpen}
            onClose={modalCloseHandler}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box className={classes.DataSetsModal}>
                <Typography variant={"h6"}>Добавьте новую выборку</Typography>
                <Box className={classes.ModalInputs}>
                    <TextField
                        sx={{ width: '60%' }}
                        required={true}
                        label="Название выборки"
                        autoComplete={'off'}
                        onChange={(event) => inputNameChangeHandler(event)}
                    />
                    <input
                        ref={downloadButton}
                        required={true}
                        type="file"
                        onInput={fileAddHandler}
                        style={{ display: 'none' }}/>
                    <Button onClick={downloadButtonHandler} variant={'outlined'}>Загрузить выборку</Button>
                </Box>
                <TextField
                    fullWidth={true}
                    multiline={true}
                    label='Описание'
                    autoComplete={'off'}
                    sx={{
                        mt: 2,
                        mb: 2
                    }}
                    onChange={(event) => inputDescriptionChangeHandler(event)}
                />
                <Button onClick={(event) => addDataSetHandler(event)}>Добавить</Button>
            </Box>
        </Modal>
    )

    if (props.loading) {
        cards = <CircularProgress />
    }

    if (props.datasets) {
        cards = (
            props.datasets.map(dataset => {
                return (
                    <DatasetCard
                        key={dataset.id}
                        id={dataset.id}
                        name={dataset.name}
                        description={dataset.description}
                        delete={() => deleteDataSetHandler(dataset.id)}
                        openDataset={() => changeRouteHandler(dataset.id)}
                    />
                )
            })
        )
    }

    return (
        <div className={classes.DataSets}>
            <div className={classes.DataSetsHeader}>
                <div>
                    <Typography variant={"h4"} fontWeight={"bold"}>Обучающие выборки</Typography>
                </div>
                <div>
                    <Button
                        variant={"contained"}
                        startIcon={<Add />}
                        onClick={modalOpenHandler}
                    >
                        Добавить выборку
                    </Button>
                </div>
            </div>
            {cards}
            {modal}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        datasets: state.datasets.datasets,
        loading: state.datasets.loading,
        tasks: state.tasks.adminTasks,
        markupUsers: state.auth.markupUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDatasets: () => dispatch(actions.fetchDatasets()),
        onAddDataset: (name, description, file) => dispatch(actions.addDataset(name, description, file)),
        onDeleteDataset: (id) => dispatch(actions.deleteDataset(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Datasets);