import React, {useEffect} from 'react';

import {connect} from 'react-redux';
import * as actions from '../../../Store/actions/rootAction';

import classes from './Samples.module.scss';
import DataSet from './DataSet/DataSet';

const DataSets = props => {

    useEffect(() => {
        props.onFetchDatasets()
    }, [])

    return (
        <div className={classes.Samples}>
            <DataSet />
            <DataSet />
            <DataSet />
            <DataSet />
            <DataSet />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDatasets: () => dispatch(actions.fetchDatasets())
    }
}

export default connect(null, mapDispatchToProps)(DataSets);