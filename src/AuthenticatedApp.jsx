import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddBook from "./components/form/AddBook";
import HomePage from "./components/pages/HomePage";
import WishlistPage from "./components/pages/WishlistPage";

export default function AuthenticatedApp() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/wishlist" component={WishlistPage} />
      <Route path="/addbooks" component={AddBook} />
    </Switch>
  );
}
