import React from 'react';

import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const Dashboard = (props) => {

    let link = null

    if (props.userType === 'admin') {
        link = '/samples'
    }

    if (props.userType === 'markup') {
        link = '/markup'
    }

    return (
        <Navigate to={link} />
    );
}

const mapStateToProps = state => {
    return {
        userType: state.auth.userType
    }
}

export default connect(mapStateToProps)(Dashboard);