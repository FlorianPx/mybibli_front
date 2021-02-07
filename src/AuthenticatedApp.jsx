import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AddBook from "./components/form/AddBook";
import BottomNavbar from "./components/navbar/BottomNavbar";
import TopNavbar from "./components/navbar/TopNavbar";
import HomePage from "./components/pages/HomePage";
import WishlistPage from "./components/pages/WishlistPage";
import SearchPage from "./components/search/SearchPage";

import "./assets/style/Global.css";

export default function AuthenticatedApp() {
  return (
    <>
      <TopNavbar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/wishlist" component={WishlistPage} />
        <Route path="/addbook" component={AddBook} />
        <Route path="/search" component={SearchPage} />
      </Switch>
      <BottomNavbar />
    </>
  );
}
