import React, {useEffect, useState} from 'react';

import {connect} from 'react-redux';
import * as actions from '../../Store/actions/rootAction';

import classes from './Datasets.module.scss';
import DatasetCard from '../../components/DatasetCard/DatasetCard';
import {Box, Button, CircularProgress, Modal, TextField, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";

import {useNavigate} from "react-router-dom";

const Datasets = props => {

    const [modalOpen, setModalOpen] = useState(false)
    const [dataSetName, setDataSetName] = useState('')
    const [dataSetFile, setDataSetFile] = useState(null)

    const {onFetchDatasets} = props

    useEffect(() => {
        onFetchDatasets()
    }, [onFetchDatasets])

    const navigate = useNavigate()

    let cards = null

    const modalOpenHandler = () => {
        setModalOpen(true)
    }
    const modalCloseHandler = () => {
        setModalOpen(false)
    }

    const inputChangeHandler = (event) => {
        let newName = event.target.value
        setDataSetName(newName)
    }

    const fileAddHandler = (event) => {
        let newFile = event.target.files[0]
        setDataSetFile(newFile)
    }

    const addDataSetHandler = () => {
        modalCloseHandler()
        props.onAddDataset(dataSetName, dataSetFile)
    }

    const deleteDataSetHandler = (id) => {
        props.onDeleteDataset(id)
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
            <Box fullWidth={true} className={classes.DataSetsModal}>
                <Typography variant={"h6"}>Добавьте новую выборку</Typography>
                <Box className={classes.ModalInputs}>
                    <TextField
                        label="Название выборки"
                        autoComplete={'off'}
                        onChange={(event) => inputChangeHandler(event)}
                    />
                    <input type="file" onInput={fileAddHandler}/>
                </Box>
                <Button onClick={addDataSetHandler}>Добавить</Button>
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
        onAddDataset: (name, file) => dispatch(actions.addDataset(name, file)),
        onDeleteDataset: (id) => dispatch(actions.deleteDataset(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Datasets);