import React from "react";

import {connect} from "react-redux";

import {Route, Routes} from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Markup from "./containers/Markup/Markup";
import Auth from "./containers/Auth/Auth";

const App = (props) => {

    return (
        <div className="App">
            <Routes>
                <Route element={<Layout />}>
                    <Route index path='/' element={<Auth />} />
                </Route>
            </Routes>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuthenticated,
        userType: state.auth.userType
    }
}

export default connect(mapStateToProps)(App);
