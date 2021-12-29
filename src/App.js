import React from "react";

import routes from "./routes/routes";
import {useRoutes} from "react-router-dom";

import {connect} from "react-redux";

import Layout from "./hoc/Layout/Layout";

const App = props => {

    const routing = useRoutes(routes(props.isAuthenticated, props.userType))

    return (
        <div className="App">
            <Layout>
                {routing}
            </Layout>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        userType: state.auth.userType
    }
}

export default connect(mapStateToProps)(App);
