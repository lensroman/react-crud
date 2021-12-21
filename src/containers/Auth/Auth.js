import React, {Fragment, useState} from "react";
import * as actions from '../../Store/actions/rootAction';

import classes from './Auth.module.scss';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {connect} from "react-redux";

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-mail'
            },
            value: '',
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Пароль'
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
                return(
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => inputChangeHandler(event, formElement.id)}
                    />
                )
            })}
            <Button>Войти</Button>
        </form>
    )

    return (
        <Fragment>
            {form}
        </Fragment>
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