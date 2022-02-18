import React from 'react';

import {
  Box,
  Button, Modal, TextField, Typography,
} from '@mui/material'
import classes from './NewUserModal.module.scss';

function NewUserModal(props) {
  return (
    <Modal
      open={props.modalOpen}
      onClose={props.modalClose}
    >
      <Box>
        <Box className={classes.NewUserModal}>
          <Typography variant="h6">Создайте нового пользователя</Typography>
          <Box className={classes.ModalInputs}>
            <TextField
              label="Имя пользователя"
              autoComplete="off"
              sx={{ mt: 2 }}
              onChange={props.usernameChange}
            />
            <TextField
              label="Пароль"
              type="password"
              sx={{ mt: 2 }}
              onChange={props.passwordChange}
            />
            <Button variant="contained" onClick={(event) => props.submit(event)} sx={{ mt: 2 }}>Создать</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default NewUserModal;
