import React, { useState } from "react";
import { useAuthState } from "../../context/AuthProvider";
import axios from "axios";

import "../../assets/style/Global.css";

const BookList = ({ bookList }) => {
  const [booksClicked, setBooksClicked] = useState([]);
  const [wishlist, setWishlist] = useState("");
  const [favorite, setFavorite] = useState("");
  const { user } = useAuthState();

  const handleChange = (e) => {
    setWishlist(e.target.value);
    setFavorite(e.target.value);
  };
  console.log({ booksClicked });
  const handleClick = (e) => {
    e.preventDefault();
    const title = booksClicked[0].title;
    const author = booksClicked[0].author;
    const img = booksClicked[0].img;
    const type = booksClicked[0].type;

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

  return (
    <div className="wrapper-card-Pages">
      {bookList.map((book, index) => {
        return (
          <div
            onClick={() => setBooksClicked([...booksClicked, book])}
            className="card-Pages"
            key={index}
          >
            <h3 className="title-card-Pages">{book.title}</h3>
            <p className="author-card-Pages">{book.author}</p>
            <img
              src={book.img}
              alt={`Livre ${book.title} de ${book.author}`}
              className="img-card-Pages"
            />
            {booksClicked.includes(book) && (
              <div className="sidebar-Pages">
                <h3 className="title-card-Pages">Ajouter ce livre à ?</h3>
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
                <button
                  className="button-form"
                  type="buton"
                  onClick={handleClick}
                >
                  Valider
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
