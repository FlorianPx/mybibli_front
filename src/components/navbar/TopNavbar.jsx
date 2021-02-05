import React from "react";

import { svgArrays } from "../../svgArray";

import "../../assets/style/Global.css";
import { useAuthState } from "../../context/AuthProvider";
import { useHistory } from "react-router-dom";

const TopNavbar = () => {
  const { user } = useAuthState();
  const history = useHistory();

  const handleReturnClick = () => {
    history.push("./home");
  };

  return (
    <div className="wrapper_navbar">
      <button className="logo_navbar" onClick={handleReturnClick}>
        MyBibli
      </button>
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
