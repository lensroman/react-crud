import React, {useState} from 'react';

import {Navigate, Link} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from '../../../Store/actions/rootAction';

import classes from './Header.module.scss';
import {
    AppBar,
    Button,
    IconButton,
    MenuItem,
    ThemeProvider,
    Toolbar,
    Typography,
    Menu
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Logout} from "@mui/icons-material";
import {theme} from "../../../UI/Theme/Theme";

function Header(props) {
    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl)

    const menuClickHandler = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const menuCloseHandler = () => {
        setAnchorEl(null);
    };

    const logoutHandler = () => {
        props.onLogout()
        return <Navigate to="/" />
    }

    let menuItems = []

    let menuButton = null

    let exitButton = null

    if (props.isAuthenticated) {
        let links = {}

        menuButton = (
            <IconButton
                color={"inherit"}
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={menuClickHandler}
                size={"large"}
            >
                <MenuIcon />
            </IconButton>
        )

        exitButton = (
            <Button
                variant={"outlined"}
                endIcon={<Logout />}
                color={"inherit"}
                size={"medium"}
                hidden={!props.isAuthenticated}
                onClick={logoutHandler}
            >
                Выход
            </Button>
        )

        if (props.userType === 'admin') {
            links = {
                '/samples': 'Выборки',
                '/admin-tasks': 'Задачи',
            }
        }

        if (props.userType === 'markup') {
            links = {
                '/markup': 'Разметка',
                '/markup-tasks': 'Задачи',
            }
        }

        for (let key in links) {
            menuItems.push(
                <MenuItem onClick={menuCloseHandler} key={key} sx={{ padding: 0 }}>
                    <Link to={key} className={classes.menuItems}>{links[key]}</Link>
                </MenuItem>)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position={"static"} color={"primary"}>
                <Toolbar>
                    {menuButton}
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={menuCloseHandler}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {menuItems.map(menuItem => {
                            return menuItem
                        })}
                    </Menu>
                    <Typography
                        variant={"h5"}
                        component={"span"}
                        sx={{ flexGrow: "1"}}
                        ml={"10px"}
                    >
                        СПО "Разметка"
                    </Typography>
                    {exitButton}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

const mapStateToProps = state => {
    return {
        userType: state.auth.userType,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);