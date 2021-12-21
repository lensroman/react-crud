import React from 'react';

import classes from './AdminPanelHeader.module.scss';
import Button from "../UI/Button/Button";

const AdminPanelHeader = props => {

    return (
        <div className={classes.AdminPanelHeader}>
            <div>
                <h1>Обучающие выборки</h1>
            </div>
            <div>
                <Button>Добавить выборку</Button>
            </div>
        </div>
    )
}

export default AdminPanelHeader;