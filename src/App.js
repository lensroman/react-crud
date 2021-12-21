import React from "react";


import Layout from "./hoc/Layout/Layout";
import Markup from "./containers/Markup/Markup";
import Auth from "./containers/Auth/Auth";
import AdminPanel from "./containers/AdminPanel/AdminPanel";


const App = () => {
  return (
    <div className="App">
      <Layout>
          <AdminPanel />
      </Layout>
    </div>
  );
}

export default (App);
