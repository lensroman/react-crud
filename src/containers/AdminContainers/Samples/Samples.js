import React from "react";

import classes from './Samples.module.scss';
import Sample from "./Sample/Sample";

const Samples = props => {

    return (
        <div className={classes.Samples}>
            <Sample />
            <Sample />
            <Sample />
            <Sample />
            <Sample />
        </div>
    )
}

export default Samples;