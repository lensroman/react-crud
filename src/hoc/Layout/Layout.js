import React, { Fragment } from "react";

import classes from './Layout.module.scss';
import SidePanel from "../../components/SidePanel/SidePanel";

const Layout = props => {

    return (
        <Fragment>
            <header className={classes.header}>
                <h3>СПО "Разметка"</h3>
                <button className={classes.exitButton}>Выход</button>
            </header>
            <div className={classes.content}>
                <main>
                    <SidePanel />
                    {props.children}
                </main>
            </div>
            <footer className={classes.footer}>
                <p>ГосНИИАС, Лаборатория 3070, 2021</p>
            </footer>
        </Fragment>
    )
};

export default Layout;