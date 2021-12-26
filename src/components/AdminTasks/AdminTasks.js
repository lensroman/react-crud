import React from "react";

import classes from './AdminTasks.module.scss';
import Task from './Task/Task';

const AdminTasks = () => {

    return (
        <div className={classes.AdminTasks}>
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
