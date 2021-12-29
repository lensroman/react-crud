import React from "react";

import classes from './Samples.module.scss';
import DataSet from "./DataSet/DataSet";

const DataSets = props => {

    //request => saving sets in store => map => render sets with information in props

    //onclick dataset's button => request to delete it on server => rerender

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

export default DataSets;