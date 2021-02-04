import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";

import Login from "./components/login/Login";
import { useAuthState } from "./context/AuthProvider";
import AuthenticatedApp from "./AuthenticatedApp";

const App = () => {
  const { isAuthenticated } = useAuthState();

  if (isAuthenticated) {
    return <AuthenticatedApp />;
  }

  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Redirect from="/*" to="/" />
    </Switch>
  );
};

export default App;
