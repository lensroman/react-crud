import React from "react";

import classes from './NavigationItems.module.scss';
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = props => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem>Разметка</NavigationItem>
            <NavigationItem>Задачи</NavigationItem>
        </ul>
    )
};

export default NavigationItems;