import React, { useState } from "react";
import { useAuthState } from "../../context/AuthProvider";
import axios from "axios";

import "../../assets/style/Global.css";

const BookList = ({ bookList }) => {
  const [bookClicked, setBookClicked] = useState(null);
  const [success, setSuccess] = useState(false);
  const [radioValue, setRadioValue] = useState("own");

  const { user } = useAuthState();

  const handleChange = (e) => {
    setRadioValue(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const bookId = bookClicked.id;

    try {
      await axios.post(
        `${process.env.REACT_APP_URL_API}users/${user.id}/books`,
        {
          book_id: bookId,
          user_id: user.id,
          favorite: "false",
          wishlist: radioValue === "wish" ? "true" : "false",
        }
      );

      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBookClicked = (book) => {
    setBookClicked(book);
  };

  const handleCancelClick = () => {
    setTimeout(() => {
      setBookClicked(null);
      setSuccess(false);
    }, 100);
  };

  return (
    <div className="wrapper-card-Pages">
      {bookList.map((book, index) => {
        return (
          <div
            onClick={(e) => handleBookClicked(book)}
            className="card-Pages"
            key={book.title}
          >
            <h3 className="title-card-Pages">{book.title}</h3>
            <p className="author-card-Pages">{book.author}</p>
            <img
              src={book.img}
              alt={`Livre ${book.title} de ${book.author}`}
              className="img-card-Pages"
            />
            {bookClicked?.id === book.id && (
              <div className="sidebar-Pages">
                {!success && (
                  <>
                    <h3 className="title-card-Pages">Ajouter ce livre à ?</h3>
                    <form onSubmit={handleClick}>
                      <label className="label-radio-form">
                        <input
                          type="radio"
                          id="own"
                          name="choice"
                          value="own"
                          checked={radioValue === "own"}
                          onChange={handleChange}
                          className="radio-form"
                          required
                        />
                        Mes livres
                      </label>
                      <label className="label-radio-form">
                        <input
                          type="radio"
                          id="wish"
                          name="choice"
                          value="wish"
                          checked={radioValue === "wish"}
                          onChange={handleChange}
                          className="radio-form"
                          required
                        />
                        Mes Envies
                      </label>
                      <button className="valid-button-form" type="submit">
                        Valider
                      </button>
                    </form>
                    <button
                      className="cancel-button-form"
                      type="button"
                      onClick={handleCancelClick}
                    >
                      Annuler
                    </button>
                  </>
                )}
                {success && (
                  <>
                    <p>Ajouté !</p>
                    <button
                      className="cancel-button-form"
                      type="button"
                      onClick={handleCancelClick}
                    >
                      Ok
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
