import React from 'react';
import { Outlet } from 'react-router-dom'

import { Container } from '@mui/material';
import { connect } from 'react-redux';
import classes from './Layout.module.scss';
import Header from './Header/Header';

function Layout(props) {
  let footer = null

  if (props.isAuthenticated) {
    footer = (
      <footer className={classes.footer}>
        <p>ГосНИИАС, Лаборатория 3070, 2021</p>
      </footer>
    )
  }

  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          paddingBottom: 8,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {props.children}
      </Container>
      {footer}
      <Outlet />
    </>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Layout);
