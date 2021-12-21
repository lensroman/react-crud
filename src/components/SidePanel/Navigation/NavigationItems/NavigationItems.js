import React, {Fragment} from "react";

import classes from './NavigationItems.module.scss';
import NavigationItem from "./NavigationItem/NavigationItem";
import ClassList from "../../ClassList/ClassList";

const NavigationItems = props => {
    let navigation = null

    if (props.userType === 'markup') {
        navigation = (
            <ul className={classes.NavigationItems}>
                <NavigationItem>Разметка</NavigationItem>
                <NavigationItem>Задачи</NavigationItem>
                <ClassList />
            </ul>
        )
    }

    if (props.userType === 'admin') {
        navigation = (
            <ul className={classes.NavigationItems}>
                <NavigationItem>Выборки</NavigationItem>
                <NavigationItem>Задачи</NavigationItem>
            </ul>
        )
    }

    return (
        <Fragment>
            {navigation}
        </Fragment>
    )
};

export default NavigationItems;