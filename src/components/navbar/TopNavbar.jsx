import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { svgArrays } from "../../svgArray";

import "../../style/style.css/TopNavbar.css";

const TopNavbar = ({ match }) => {
  // const { userId } = match.params;
  const [user, setUser] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}users/1`)
      .then((response) => response.data)
      .then((data) => setUser(data[0]));
  }, []);

  return (
    <div className="wrapper_navbar">
      <p className="logo_navbar">MyBibli</p>
      <button className="button_navbar">
        {user && (
          <img
            className="image_navbar"
            src={
              svgArrays.find((icon) => Number(icon.id) === user.image_id).src
            }
            alt={`Avatar du compte de ${user.name}`}
          />
        )}
        <p className="username_navbar">{user.name}</p>
      </button>
    </div>
  );
};

TopNavbar.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default TopNavbar;
