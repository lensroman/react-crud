import React from "react";

import classes from './Input.module.scss';

const Input = props => {

    let inputElement = null

    switch (props.elementType) {
        case ('input'): {
            inputElement = <input
                className={classes.Input}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
            break
        }
        default: {
            inputElement = <input
                className={classes.Input}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />
        }
    }


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input