import React, {useState} from "react";

import * as actions from '../../Store/actions/rootAction';
import {connect} from "react-redux";

import classes from './Auth.module.scss';
import {TextField, Button, Card} from "@mui/material";

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                label: 'E-mail'
            },
            value: '',
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                label: 'Password'
            },
            value: '',
        }
    })

    const formElementsArray = []

    for (let key in controls) {
        formElementsArray.push({id: key, config: controls[key]})
    }

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                touched: true
            }
        }
        setControls(updatedControls)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value)
    }

    let form = (
        <form onSubmit={submitHandler} className={classes.form}>
            {formElementsArray.map(formElement => {
                return (
                    <TextField
                        key={formElement.id}
                        value={formElement.config.value}
                        onChange={(event) => inputChangeHandler(event, formElement.id)}
                        label={formElement.config.elementConfig.label}
                        margin={"dense"}
                    />
                )
            })}
            <Button onClick={submitHandler} variant={"contained"} size={"large"} sx={{mt: 3}}>Войти</Button>
        </form>
    )

    return (
        <div className={classes.form}>
            <Card sx={{ maxWidth: 500 }} variant={"outlined"}>
                {form}
            </Card>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)