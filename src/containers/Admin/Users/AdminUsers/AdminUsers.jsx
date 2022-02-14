import React, { useState } from 'react';

import {
  Button, FormControl, TextField, Typography,
} from '@mui/material';
import { connect } from 'react-redux';
import classes from './AdminUsers.module.scss';

import * as actions from '../../../../Store/actions/rootAction';

function AdminUsers(props) {
  const [newUsername, setNewUsername] = useState('')

  const [newPassword, setNewPassword] = useState('')

  const usernameChangeHandler = (event) => {
    const username = event.target.value
    setNewUsername(username)
  }

  const passwordChangeHandler = (event) => {
    const password = event.target.value
    setNewPassword(password)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    const data = {
      username: newUsername,
      password: newPassword,
    }
    props.onAddNewUser(data)
  }

  return (
    <div className={classes.AdminUsers}>
      <FormControl>
        <Typography variant="h6">Создайте нового пользователя</Typography>
        <TextField
          label="Имя пользователя"
          autoComplete="off"
          sx={{ mt: 2 }}
          onChange={usernameChangeHandler}
        />
        <TextField
          label="Пароль"
          type="password"
          sx={{ mt: 2 }}
          onChange={passwordChangeHandler}
        />
        <Button variant="contained" onClick={(event) => submitHandler(event)} sx={{ mt: 2 }}>Создать</Button>
      </FormControl>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onAddNewUser: (data) => dispatch(actions.addNewUser(data)),
})

export default connect(null, mapDispatchToProps)(AdminUsers);
