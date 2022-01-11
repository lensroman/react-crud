import React, {useEffect} from 'react';

import {connect} from 'react-redux';
import * as actions from '../../../Store/actions/rootAction';

import classes from './Samples.module.scss';
import DataSet from './DataSet/DataSet';
import {Button, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";

const DataSets = props => {

    const {onFetchDataSets} = props

    useEffect(() => {
        onFetchDataSets()
    }, [onFetchDataSets])

    // const deleteHandler = () => {
    //     props.onDeleteDataset(id)
    // }

    return (
        <div className={classes.DataSets}>
            <div className={classes.DataSetsHeader}>
                <div>
                    <Typography variant={"h4"} fontWeight={"bold"}>Обучающие выборки</Typography>
                </div>
                <div>
                    <Button variant={"contained"} startIcon={<Add />}>Добавить выборку</Button>
                </div>
            </div>
            <DataSet />
            <DataSet />
            <DataSet />
            <DataSet />
            <DataSet />
        </div>
    )
}

// datasets.map(dataset => {
//      return (
//          <DataSet
//              id={dataset.id}
//              deleteDataset={(dataset.id) => deleteHandler(id)}
//      )
// })

const mapStateToProps = state => {
    return {
        dataSets: state.dataSets.dataSets
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDataSets: () => dispatch(actions.fetchDataSets())
    }
}

export default connect(null, mapDispatchToProps)(DataSets);