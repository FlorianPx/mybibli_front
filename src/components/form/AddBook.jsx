import React, { useState } from "react";
import { useAuthState } from "../../context/AuthProvider";
import axios from "axios";

import "../../assets/style/Global.css";

const AddBook = () => {
  const [wishlist, setWishlist] = useState("");
  const [favorite, setFavorite] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [img, setImg] = useState("");
  const [type, setType] = useState("");
  const { user } = useAuthState();

  const handleClick = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_URL_API}books`, {
        title,
        author,
        img,
        type,
      })
      .then((res) => res.data)
      .then((data) => {
        axios.post(`${process.env.REACT_APP_URL_API}users/${user.id}/books`, {
          book_id: data.insertId,
          user_id: user.id,
          favorite,
          wishlist,
        });
      });
  };

  const handleChange = (e) => {
    setWishlist(e.target.value);
  };
  const handleFavoriteChange = (e) => {
    setFavorite(e.target.value);
  };
  const handleInputTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleInputAuthorChange = (e) => {
    setAuthor(e.target.value);
  };
  const handleInputImageChange = (e) => {
    setImg(e.target.value);
  };
  const handleSelectChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div className="global-form">
      <form className="wrapper-form">
        <h2 className="title-form">Ajouter le livre dans :</h2>
        <div className="wrapper-radio-form">
          <label className="label-radio-form">
            <input
              type="radio"
              id="own"
              value="false"
              checked={wishlist === "false"}
              onChange={handleChange}
              className="radio-form"
            />
            Mes livres
          </label>
          <label className="label-radio-form">
            <input
              type="radio"
              id="wish"
              value="true"
              checked={wishlist === "true"}
              onChange={handleChange}
              className="radio-form"
            />
            Mes Envies
          </label>
        </div>
        <label className="label-input-form">
          <input
            type="text"
            id="title"
            placeholder="Titre"
            onChange={handleInputTitleChange}
            className="input-form"
          />
        </label>
        <label className="label-input-form">
          <input
            type="text"
            id="author"
            placeholder="Auteur"
            onChange={handleInputAuthorChange}
            className="input-form"
          />
        </label>
        <select
          name="select-type-book"
          id="select-book"
          onChange={handleSelectChange}
          className="select-form"
        >
          <option value="">Sélectionner le genre du livre</option>
          <option value="BD">BD</option>
          <option value="Comics">Comics</option>
          <option value="Fantastique">Fantastique</option>
          <option value="Manga">Manga</option>
          <option value="Roman">Roman</option>
          <option value="Roman Graphique">Roman Graphique</option>
        </select>
        <label className="label-input-form">
          <input
            type="text"
            id="image"
            placeholder="https//:ajouteuneimagesitulesouhaites"
            onChange={handleInputImageChange}
            className="input-form"
          />
        </label>
        <h2 className="title-form">Mettre en favoris ?</h2>
        <div className="wrapper-radio-form">
          <label className="label-radio-form">
            <input
              type="radio"
              id="yes"
              value="true"
              checked={favorite === "true"}
              onChange={handleFavoriteChange}
              className="radio-form"
            />
            Oui
          </label>
          <label className="label-radio-form">
            <input
              type="radio"
              id="no"
              value="false"
              checked={favorite === "false"}
              onChange={handleFavoriteChange}
              className="radio-form"
            />
            Non
          </label>
        </div>
        <button className="button-form" type="buton" onClick={handleClick}>
          Valider
        </button>
      </form>
    </div>
  );
};

export default AddBook;
