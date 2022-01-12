import React, {useState} from 'react';

import classes from './AdminTasks.module.scss';
import Task from '../../../components/Task/Task';
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography} from '@mui/material';
import {Add} from '@mui/icons-material';

const AdminTasks = () => {

    const [modalOpen, setModalOpen] = useState(false)

    const modalOpenHandler = () => {
        setModalOpen(true)
    }
    const modalCloseHandler = () => {
        setModalOpen(false)
    }

    let modal = (
        <Modal
            open={modalOpen}
            onClose={modalCloseHandler}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <FormControl fullWidth={true} className={classes.AdminTasksModal}>
                <div>
                    <Select label={'label'} sx={{ width: 200 }}>

                    </Select>
                </div>
            </FormControl>
        </Modal>
    )

    return (
        <div className={classes.AdminTasks}>
            <div className={classes.AdminTasksHeader}>
                <div>
                    <Typography variant={"h4"} fontWeight={"bold"}>Задачи</Typography>
                </div>
                <div>
                    <Button
                        variant={"contained"}
                        startIcon={<Add />}
                        onClick={modalOpenHandler}
                    >
                        Создать задачу
                    </Button>
                </div>
                {modal}
            </div>
        </div>
    )
}

export default AdminTasks;
