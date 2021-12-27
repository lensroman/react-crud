import React from 'react';

import {Routes, Route} from 'react-router-dom';

import classes from './AdminPanelHeader.module.scss';
import {Box, Button, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";

const AdminPanelHeader = props => {

    let samples = (
        <div className={classes.AdminPanelHeader}>
            <div>
                <Typography variant={"h4"} fontWeight={"bold"}>Обучающие выборки</Typography>
            </div>
            <div>
                <Button variant={"contained"} startIcon={<Add />}>Добавить выборку</Button>
            </div>
        </div>
    )

    let tasks = (
        <div className={classes.AdminPanelHeader}>
            <div>
                <Typography variant={"h4"} fontWeight={"bold"}>Задачи</Typography>
            </div>
            <div>
                <Button variant={"contained"} startIcon={<Add />}>Создать задачу</Button>
            </div>
        </div>
    )

    return (
        <Routes>
            <Route path={"/samples"} element={samples} />
            <Route path={"/tasks"} element={tasks} />
        </Routes>
    )
}

export default AdminPanelHeader;