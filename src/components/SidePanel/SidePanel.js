import React from "react";
import { connect } from "react-redux";

import classes from './SidePanel.module.scss';
import NavigationItems from "./Navigation/NavigationItems/NavigationItems";
import ClassList from "./ClassList/ClassList";


const SidePanel = (props) => {

    let attachedClasses = [classes.SidePanel, classes.Auth]

    if (!props.isAuthenticated) {
        attachedClasses = [classes.SidePanel, classes.notAuth]
    }

    return (
        <div className={attachedClasses.join(' ')}>
            <NavigationItems />
            <ClassList />
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(SidePanel);