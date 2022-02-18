import React, { useState } from 'react';

import { Navigate, Link } from 'react-router-dom';

import {
  AppBar,
  Button,
  IconButton,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
  Menu,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Logout } from '@mui/icons-material';

import { connect } from 'react-redux';
import * as actions from '../../../Store/actions/rootAction';

import classes from './AppHeader.module.scss';
import theme from '../../../UI/Theme/Theme';

function AppHeader(props) {
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

  const menuItems = []

  let menuButton = null

  let exitButton = null

  if (props.isAuthenticated) {
    let links = {}

    menuButton = (
      <IconButton
        color="inherit"
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={menuClickHandler}
        size="large"
      >
        <MenuIcon />
      </IconButton>
    )

    exitButton = (
      <Button
        variant="outlined"
        endIcon={<Logout />}
        color="inherit"
        size="medium"
        hidden={!props.isAuthenticated}
        onClick={logoutHandler}
      >
        Выход
      </Button>
    )

    if (props.isStaff === true) {
      links = {
        '/samples': 'Выборки',
        '/admin-tasks': 'Задачи',
        '/admin-users': 'Пользователи',
      }
    }

    if (props.isStaff === false) {
      links = {
        '/markup-tasks': 'Задачи',
      }
    }

    Object.keys(links).forEach((key) => {
      menuItems.push(
        <MenuItem onClick={menuCloseHandler} key={key} sx={{ padding: 0 }}>
          <Link to={key} className={classes.menuItems}>{links[key]}</Link>
        </MenuItem>,
      )
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
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
            {menuItems.map((menuItem) => menuItem)}
          </Menu>
          <Typography
            variant="h5"
            component="span"
            sx={{ flexGrow: '1' }}
            ml="10px"
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            СПО "Разметка"
          </Typography>
          {exitButton}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  userType: state.auth.userType,
  isAuthenticated: state.auth.isAuthenticated,
  isStaff: state.auth.isStaff,
})

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(actions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
