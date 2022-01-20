import React, {useState} from 'react';

import classes from './AdminUsers.module.scss';
import {Button, FormControl, TextField, Typography} from "@mui/material";

import * as actions from '../../Store/actions/rootAction';
import {connect} from "react-redux";

const AdminUsers = (props) => {

    const [newUsername, setNewUsername] = useState('')

    const [newPassword, setNewPassword] = useState('')

    const usernameChangeHandler = (event) => {
        let username = event.target.value
        setNewUsername(username)
    }

    const passwordChangeHandler = (event) => {
        let password = event.target.value
        setNewPassword(password)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const data = {
            "username": newUsername,
            "password": newPassword
        }
        console.log(data)
        props.onAddNewUser(data)
    }

    return (
        <div className={classes.AdminUsers}>
            <FormControl>
                <Typography variant={'h6'}>Создайте нового пользователя</Typography>
                <TextField
                    label={'Username'}
                    autoComplete={'off'}
                    sx={{ mt: 2 }}
                    onChange={usernameChangeHandler}
                />
                <TextField
                    label={'Password'}
                    type={'password'}
                    sx={{ mt: 2 }}
                    onChange={passwordChangeHandler}
                />
                <Button variant={'contained'} onClick={(event) => submitHandler(event)} sx={{ mt: 2 }}>Создать</Button>
            </FormControl>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onAddNewUser: (data) => dispatch(actions.addNewUser(data))
    }
}

export default connect(null, mapDispatchToProps)(AdminUsers);