import React, {useEffect} from "react";

import axios from "../../../axios-auth";

import classes from './Samples.module.scss';
import DataSet from "./DataSet/DataSet";

const DataSets = props => {

    useEffect(() => {
        axios.get('/ping/')
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

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