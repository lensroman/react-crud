import React from "react";

const Input = props => {

    return (
        <input
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.changed}
        />
    )
}

export default Input