import React from "react";

import { svgArrays } from "../../svgArray";

import "../../assets/style/Global.css";
import { useAuthState } from "../../context/AuthProvider";

const TopNavbar = () => {
  const { user } = useAuthState();

  return (
    <div className="wrapper_navbar">
      <p className="logo_navbar">MyBibli</p>
      <button className="button_navbar">
        {user && (
          <img
            className="image_navbar"
            src={svgArrays.find((icon) => Number(icon.id) === user.iconId).src}
            alt={`Avatar du compte de ${user.name}`}
          />
        )}
        <p className="username_navbar">{user.name}</p>
      </button>
    </div>
  );
};

export default TopNavbar;
