import React from "react";

import Layout from "./hoc/Layout/Layout";
import SidePanel from "./components/SidePanel/SidePanel";
import Canvas from './components/Canvas/Canvas';

const App = () => {
  return (
    <div className="App">
      <Layout>
          <SidePanel />
          <Canvas />
      </Layout>
    </div>
  );
}

export default App;
