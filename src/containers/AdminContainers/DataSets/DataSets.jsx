import React, {useEffect, useState} from 'react';

import {connect} from 'react-redux';
import * as actions from '../../../Store/actions/rootAction';

import classes from './DataSets.module.scss';
import DataSet from '../../../components/DataSet/DataSet';
import {Box, Button, FormControl, Modal, TextField, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";

const DataSets = props => {

    const [modalOpen, setModalOpen] = useState(false)
    const [dataSetName, setDataSetName] = useState('')
    const [dataSetFile, setDataSetFile] = useState(null)

    const {onFetchDataSets} = props

    useEffect(() => {
        onFetchDataSets()
    }, [onFetchDataSets])

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
        props.onAddDataSet(dataSetName, dataSetFile)
    }

    const deleteDataSetHandler = (id) => {
        props.onDeleteDataSet(id)
    }

    let modal = (
        <Modal
            open={modalOpen}
            onClose={modalCloseHandler}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <FormControl fullWidth={true} className={classes.DataSetsModal}>
                <TextField
                    label="Название выборки"
                    size={'small'}
                    autoComplete={'off'}
                    onChange={(event) => inputChangeHandler(event)}
                />
                <input type="file" onInput={fileAddHandler}/>
                <Button onClick={addDataSetHandler}>Добавить</Button>
            </FormControl>
        </Modal>
    )

    if (props.dataSets) {
        cards = (
            props.dataSets.map(dataSet => {
                return (
                    <DataSet
                        key={dataSet.id}
                        id={dataSet.id}
                        name={dataSet.name}
                        delete={() => deleteDataSetHandler(dataSet.id)}
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
        dataSets: state.dataSets.dataSets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDataSets: () => dispatch(actions.fetchDataSets()),
        onAddDataSet: (name, file) => dispatch(actions.addDataSet(name, file)),
        onDeleteDataSet: (id) => dispatch(actions.deleteDataSet(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSets);