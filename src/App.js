import React, {useEffect} from "react";

import routes from "./routes/routes";
import {useRoutes} from "react-router-dom";

import * as actions from './Store/actions/rootAction';
import {connect} from "react-redux";

import Layout from "./hoc/Layout/Layout";

const App = props => {

    const { onTryAutoSignUp } = props
    useEffect(() => {
        onTryAutoSignUp()
    }, [onTryAutoSignUp])

    const routing = useRoutes(routes(props.isAuthenticated, props.isStaff))

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
        isStaff: state.auth.isStaff
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
