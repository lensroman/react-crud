import React, {Fragment, useState} from 'react';

import classes from './Header.module.scss';

import {
    AppBar,
    Button,
    Hidden,
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

import {Link} from "react-router-dom";
import {connect} from "react-redux";

function Header(props) {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const menuClickHandler = (event) => {
        console.log('menu')
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };
    const menuCloseHandler = () => {
        setAnchorEl(null);
    };

    let menuItems = null

    if (props.userType === 'admin') {
        menuItems = (
            <Fragment>
                <MenuItem onClick={menuCloseHandler}>
                    <Link to="/samples" className={classes.menuItems}>Выборки</Link>
                </MenuItem>
                <MenuItem onClick={menuCloseHandler}>
                    <Link to="/tasks" className={classes.menuItems}>Задачи</Link>
                </MenuItem>
            </Fragment>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <AppBar position={"static"} color={"primary"}>
                <Toolbar>
                    <IconButton
                        color={"inherit"}
                        id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={menuClickHandler}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Hidden>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={menuCloseHandler}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {menuItems}
                        </Menu>
                    </Hidden>
                    <Typography
                        variant={"h6"}
                        component={"span"}
                        sx={{ flexGrow: "1"}}
                        ml={"10px"}
                    >
                        СПО "Разметка"
                    </Typography>
                    <Button
                        variant={"outlined"}
                        endIcon={<Logout />}
                        color={"inherit"}
                        size={"medium"}
                    >
                        Выход
                    </Button>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

const mapStateToProps = state => {
    return {
        userType: state.auth.userType
    }
}

export default connect(mapStateToProps)(Header);