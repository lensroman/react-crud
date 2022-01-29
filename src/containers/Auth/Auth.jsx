import React, { useState } from 'react';

import * as actions from '../../Store/actions/rootAction';
import {connect} from "react-redux";

import classes from './Auth.module.scss';
import {TextField, Button, CircularProgress, FormControl, Typography, Alert, Box} from "@mui/material";

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'username',
                label: 'Имя пользователя'
            },
            value: '',
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                label: 'Пароль'
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

    let content = (
        <div className={classes.form}>
            <form id={'auth-form'}>
                <FormControl error={Boolean(props.error)} onSubmit={submitHandler}>
                    <Typography variant={'h6'}>Авторизация</Typography>
                    {formElementsArray.map(formElement => {
                        return (
                            <TextField
                                type={formElement.config.elementConfig.type}
                                autoComplete={'off'}
                                key={formElement.id}
                                value={formElement.config.value}
                                onChange={(event) => inputChangeHandler(event, formElement.id)}
                                label={formElement.config.elementConfig.label}
                                margin={"dense"}
                            />
                        )
                    })}
                    <Button type={'submit'} form={'auth-form'} onClick={submitHandler} variant={"contained"} size={"large"} sx={{mt: 3}}>Войти</Button>
                </FormControl>
            </form>
        </div>
    )

    if(props.loading) {
        content = (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <CircularProgress />
            </Box>
        )
    }

    const alert = props.error ? <Alert severity={'error'} sx={{ padding: 2, mt: 2 }}>{props.error}</Alert> : null

    return (
        <div>
            {alert}
            {content}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (userName, password) => dispatch(actions.authAction(userName, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)