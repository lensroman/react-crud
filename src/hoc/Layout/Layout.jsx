import React, { Fragment } from "react";
import { Outlet } from 'react-router-dom'

import classes from './Layout.module.scss';
import Header from "./Header/Header";
import {Container} from "@mui/material";
import {connect} from "react-redux";

const Layout = props => {

    let footer = null

    if (props.isAuthenticated) {
        footer = (
            <footer className={classes.footer}>
                <p>ГосНИИАС, Лаборатория 3070, 2021</p>
            </footer>
        )
    }

    return (
        <Fragment>
            <Header />
            <Container
                maxWidth={"xl"}
                sx={{
                    paddingBottom: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    minHeight: 'calc(100vh - 64px)'
                }}
            >
                {props.children}
            </Container>
            {footer}
            <Outlet />
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Layout);