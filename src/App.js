import React from "react";
import Layout from "./hoc/Layout/Layout";
import SidePanel from "./components/SidePanel/SidePanel";

const App = () => {
  return (
    <div className="App">
      <Layout>
          <SidePanel />
      </Layout>
    </div>
  );
}

export default App;
