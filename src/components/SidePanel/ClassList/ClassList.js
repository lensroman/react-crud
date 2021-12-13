import React from "react";

import classes from './ClassList.module.scss';

const ClassList = props => {

    return (
        <div className={classes.ClassList}>
            <p>Список классов</p>
            <ul>
                <li>Дом</li>
                <li>Небо</li>
                <li>Земля</li>
            </ul>
        </div>
    )
};

export default ClassList;