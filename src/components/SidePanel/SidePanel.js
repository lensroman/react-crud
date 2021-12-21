import React from "react";
import { connect } from "react-redux";

import classes from './SidePanel.module.scss';
import NavigationItems from "./Navigation/NavigationItems/NavigationItems";


const SidePanel = (props) => {

    let attachedClasses = [classes.SidePanel, classes.Auth]

    if (!props.isAuthenticated) {
        attachedClasses = [classes.SidePanel, classes.notAuth]
    }

    return (
        <div className={attachedClasses.join(' ')}>
            <NavigationItems userType={props.userType} />
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userType: state.auth.userType
    }
}

export default connect(mapStateToProps)(SidePanel);