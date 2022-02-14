import React, { useRef, useState } from 'react';

import { connect } from 'react-redux';
import {
  TextField, Button, CircularProgress, FormControl, Typography, Box,
} from '@mui/material';
import * as actions from '../../Store/actions/rootAction';

import classes from './Auth.module.scss';
import CustomAlert from '../../components/CustomAlert/CustomAlert';

function Auth(props) {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'username',
        label: 'Имя пользователя',
      },
      value: '',
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        label: 'Пароль',
      },
      value: '',
    },
  })

  const formRef = useRef(null)

  const formElementsArray = []
  Object.keys(controls).forEach((key) => {
    formElementsArray.push({ id: key, config: controls[key] })
  })

  const inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      [controlName]: {
        value: event.target.value,
        touched: true,
        ...controls[controlName],
      },
      ...controls,
    }
    setControls(updatedControls)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    props.onAuth(controls.email.value, controls.password.value)
  }

  let content = (
    <div className={classes.form}>
      <form id="auth-form" ref={formRef} onSubmit={submitHandler}>
        <FormControl error={Boolean(props.error)}>
          <Typography variant="h6">Авторизация</Typography>
          {formElementsArray.map((formElement) => (
            <TextField
              required
              type={formElement.config.elementConfig.type}
              autoComplete="off"
              key={formElement.id}
              value={formElement.config.value}
              onChange={(event) => inputChangeHandler(event, formElement.id)}
              label={formElement.config.elementConfig.label}
              margin="dense"
            />
          ))}
          <Button
            type="submit"
            form="auth-form"
            onClick={() => formRef.current.reportValidity()}
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
          >Войти
          </Button>
        </FormControl>
      </form>
    </div>
  )

  if (props.loading) {
    content = (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <CircularProgress />
      </Box>
    )
  }

  const alert = props.error ? <CustomAlert errors={props.error} /> : null

  return (
    <div>
      {alert}
      {content}
    </div>
  )
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
})

const mapDispatchToProps = (dispatch) => ({
  onAuth: (userName, password) => dispatch(actions.authAction(userName, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
