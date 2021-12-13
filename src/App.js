import React from "react";

import Layout from "./hoc/Layout/Layout";
import SidePanel from "./components/SidePanel/SidePanel";

import Markup from "./containers/Markup/Markup";


const App = () => {
  return (
    <div className="App">
      <Layout>
          <Markup />
      </Layout>
    </div>
  );
}

export default App;
