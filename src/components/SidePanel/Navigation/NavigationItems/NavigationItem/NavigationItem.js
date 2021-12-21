import React from "react";

import classes from './NavigationItem.module.scss';
import {Link} from "react-router-dom";

const NavigationItem = props => {
    return (
        <li className={classes.NavigationItem}>
            <Link to={props.path}>{props.children}</Link>
        </li>
    )
};

export default NavigationItem;