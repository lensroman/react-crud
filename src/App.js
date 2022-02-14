import React, { useEffect } from 'react';

import { useRoutes } from 'react-router-dom';
import { connect } from 'react-redux';
import routes from './routes/routes';

import * as actions from './Store/actions/rootAction';

import Layout from './hoc/Layout/Layout';

function App(props) {
  const { onTryAutoSignUp } = props
  useEffect(() => {
    onTryAutoSignUp()
  }, [onTryAutoSignUp])

  const routing = useRoutes(routes(props.isAuthenticated, props.isStaff))

  return (
    <div className="App">
      <Layout>
        {routing}
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isStaff: state.auth.isStaff,
})

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignUp: () => dispatch(actions.authCheck()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
