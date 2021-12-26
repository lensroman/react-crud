import React from "react";

import {connect} from "react-redux";

import Layout from "./hoc/Layout/Layout";
import Markup from "./containers/Markup/Markup";
import Auth from "./containers/Auth/Auth";
import AdminPanel from "./containers/AdminPanel/AdminPanel";


const App = props => {

    return (
        <div className="App">
            <Layout>
                <Auth />
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
