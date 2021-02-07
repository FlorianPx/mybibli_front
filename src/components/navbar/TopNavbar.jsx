import React, { useMemo } from "react";

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

  const picture = useMemo(
    () => svgArrays.find((icon) => icon.id === user.iconId).picture,
    [user]
  );

  return (
    <div className="wrapper_navbar">
      <button className="logo_navbar" onClick={handleReturnClick}>
        MyBibli
      </button>
      <button className="button_navbar">
        {picture && (
          <img
            className="image_navbar"
            src={picture}
            alt={`Avatar du compte de ${user.name}`}
          />
        )}
        <p className="username_navbar">{user.name}</p>
      </button>
    </div>
  );
};

export default TopNavbar;
