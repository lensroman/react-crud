import React from "react";

import classes from './Button.module.scss';

const Button = props => {

    return (
        <button
            disabled={props.disabled}
            onClick={props.clicked}
            className={classes.Button}
        >
            {props.children}
        </button>
    )
}

export default Button