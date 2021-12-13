import React from "react";

import classes from './SidePanel.module.scss';
import NavigationItems from "./Navigation/NavigationItems/NavigationItems";
import ClassList from "./ClassList/ClassList";

const SidePanel = (props) => {
    return (
        <div className={classes.SidePanel}>
            <NavigationItems />
            <ClassList />
        </div>
    )
};

export default SidePanel;