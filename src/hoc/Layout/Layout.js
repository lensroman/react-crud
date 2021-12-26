import React, { Fragment } from "react";
import { Outlet } from 'react-router-dom'

import classes from './Layout.module.scss';
import Header from "./Header/Header";
import {Container} from "@mui/material";

const Layout = props => {

    return (
        <Fragment>
            <Header />
            <Container  maxWidth="xl" sx={{ mt: "1rem" }}>
                {props.children}
            </Container>
            <footer className={classes.footer}>
                <p>ГосНИИАС, Лаборатория 3070, 2021</p>
            </footer>
            <Outlet />
        </Fragment>
    )
};

export default Layout;