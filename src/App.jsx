import React from "react";
import { Route, Switch } from "react-router-dom";
import TopNavbar from "./components/navbar/TopNavbar";

import "./App.css";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={TopNavbar} />
    </Switch>
  );
};

export default App;
