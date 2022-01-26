import React from 'react';

import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const Dashboard = (props) => {

    let link = null

    if (props.isStaff) {
        link = '/samples'
    }

    if (!props.isStaff) {
        link = '/markup-tasks'
    }

    return (
        <Navigate to={link} />
    );
}

const mapStateToProps = state => {
    return {
        isStaff: state.auth.isStaff
    }
}

export default connect(mapStateToProps)(Dashboard);