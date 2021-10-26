import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthState } from "../../context/AuthProvider";

import "../../assets/style/Global.css";

import Book from "../icons/Book";
import Wishlist from "../icons/Wishlist";
import Magnifier from "../icons/Magnifier";
import Logout from "../icons/Logout";

const BottomNavbar = () => {
  const { logout } = useAuthState();

  return (
    <div className="wrapper-bottomNavbar">
      <NavLink exact to="/home" className="link-bottomNavbar">
        <Book className="logo-bottomNavbar" />
        Mes livres
      </NavLink>
      <NavLink exact to="/wishlist" className="link-bottomNavbar">
        <Wishlist className="logo-bottomNavbar" />
        Mes envies
      </NavLink>
      <NavLink exact to="/search" className="link-bottomNavbar">
        <Magnifier className="logo-bottomNavbar" />
        Rechercher
      </NavLink>
      <button type="button" className="button-bottomNavbar" onClick={logout}>
        <Logout className="logo-bottomNavbar" />
        Quitter
      </button>
    </div>
  );
};

export default BottomNavbar;
