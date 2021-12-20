import React from "react";

import Input from "../../components/UI/Input/Input";

const Auth = props => {
    // state for organization data for request
        // object with right structure like backend has

    // re-used input component
        // placeholders, onChange methods, right types

    // validation
        // email validation, hide password with dots

    return (
        <div>
            <Input placeholder="email"/>
            <Input placeholder="password" />
        </div>
    )
}

export default Auth