import React from "react";

import Layout from "./hoc/Layout/Layout";

import Markup from "./containers/Markup/Markup";
import Auth from "./containers/Auth/Auth";

const App = () => {
  return (
    <div className="App">
      <Layout>
          <Auth />
      </Layout>
    </div>
  );
}

export default App;
