import React, { Fragment } from "react";

import classes from './Layout.module.scss';

const Layout = props => {

    return (
        <Fragment>
            <header className={classes.header}>
                <h3>СПО "Разметка"</h3>
                <button className={classes.exitButton}>Выход</button>
            </header>
            <main>
                 SidePanel
                 Workspace
            </main>
            <footer className={classes.footer}>
                <p>ГосНИИАС, Лаборатория 3070, 2021</p>
            </footer>
        </Fragment>
    )
};

export default Layout;