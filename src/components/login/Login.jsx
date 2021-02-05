import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../assets/style/Global.css";
import LogoStory from "../../assets/images/svg/storytelling.svg";
import { useAuthState } from "../../context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthState();

  const handleClick = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="global-form">
      <form className="wrapper-form">
        <div className="logo-login">
          <h1 className="title-login">MyBibli</h1>
          <img
            className="image-login"
            src={LogoStory}
            alt="Logo de la page d'accueil représentant un livre"
          />
        </div>
        <label className="label-input-form">
          <input
            type="email"
            id="email"
            placeholder="email@exemple.com"
            onChange={handleEmailChange}
            className="input-form"
          />
        </label>
        <label className="label-input-form">
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            onChange={handlePasswordChange}
            className="input-form"
          />
        </label>
        <button className="button-form" type="buton" onClick={handleClick}>
          Valider
        </button>
        <Link className="link-login" to="/accountCreation">
          Pas encore de compte ?
        </Link>
      </form>
    </div>
  );
};

export default Login;
