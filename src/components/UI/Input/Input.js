import React from "react";

import {TextField} from "@mui/material";

const Input = props => {

    let inputElement = null

    switch (props.elementType) {
        case ('input'): {
            inputElement = <TextField
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                label={props.label}
                variant={"filled"}
                size={"large"}
                sx={{ mt: 5 }}
            />
            break
        }
        default: {
            inputElement = <TextField
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                label={props.label}
                variant={"filled"}
                sx={{ mt: 5 }}
            />
        }
    }


    return (
        <div>
            {inputElement}
        </div>
    )
}

export default Input