import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import TopNavbar from "./components/navbar/TopNavbar";
import AddBook from "./components/form/AddBook";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={TopNavbar} />
      <Route path="/addbooks" component={AddBook} />
    </Switch>
  );
};

export default App;
