import React from "react";

import classes from './AdminTasks.module.scss';
import Task from './Task/Task';
import {Button, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";

const AdminTasks = () => {

    return (
        <div className={classes.AdminTasks}>
            <div className={classes.AdminTasksHeader}>
                <div>
                    <Typography variant={"h4"} fontWeight={"bold"}>Задачи</Typography>
                </div>
                <div>
                    <Button variant={"contained"} startIcon={<Add />}>Создать задачу</Button>
                </div>
            </div>
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
        </div>
    )
}

export default AdminTasks;
