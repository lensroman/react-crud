import React from 'react';

import classes from './Form.module.scss';
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

const Form = props => {

    return(
        <div className={classes.Form}>
            <Input placeholder="email"/>
            <Input placeholder="password" />
            <Button>Войти</Button>
        </div>
    )
}

export default Form;