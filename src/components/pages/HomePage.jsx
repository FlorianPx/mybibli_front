import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "../../context/AuthProvider";

import ButtonAddBook from "../navbar/ButtonAddBook";
import Heart from "../icons/Heart";

import "../../assets/style/Global.css";
import Delete from "../../assets/images/svg/trash.svg";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const { user } = useAuthState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}users/${user.id}/books/mybooks`)
      .then((response) => response.data)
      .then((data) => setBooks(data));
  }, [user.id]);

  const handleDeleteClick = (book) => {
    axios
      .delete(`${process.env.REACT_APP_URL_API}books/${book.userBook_id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        const newBooks = books.filter(
          (b) => b.userBook_id !== book.userBook_id
        );
        setBooks(newBooks);
      })
      .catch((error) => console.log(error));
  };

  const handleFavoriteClick = (book) => {
    const newFavoriteValue = !(book.favorite === "true");
    const newBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      img: book.img,
      favorite: newFavoriteValue.toString(),
      wishlist: book.wishlist,
      userBook_id: book.userBook_id,
    };
    axios
      .put(
        `${process.env.REACT_APP_URL_API}books/${book.userBook_id}/favorite`,
        {
          favorite: newBook.favorite,
        }
      )
      .then(() => {
        const newBooks = books.map((b) => (b.id === book.id ? newBook : b));
        setBooks(newBooks);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="wrapper-Pages">
      <div className="wrapper-card-Pages">
        {books.map((book) => (
          <article
            className="card-Pages"
            key={`${book.title} de ${book.author}`}
          >
            <h3 className="title-card-Pages">{book.title}</h3>
            <p className="author-card-Pages">{book.author}</p>
            <img
              src={book.img}
              alt={`Livre ${book.title} de ${book.author}`}
              className="img-card-Pages"
            />
            <div className="wrapper-button-Pages">
              <button
                type="button"
                className="delete-button-Pages"
                onClick={() => handleDeleteClick(book)}
                title="Delete"
              >
                <img
                  src={Delete}
                  alt="Logo supprimer"
                  className="delete-logo-Pages"
                />
              </button>
              <button
                type="button"
                className="favorite-button-Pages"
                onClick={() => handleFavoriteClick(book)}
                title="Favorite"
              >
                <Heart
                  className={
                    book.favorite === "true"
                      ? "favorite-book"
                      : "nofavorite-book"
                  }
                />
              </button>
            </div>
          </article>
        ))}
      </div>
      <ButtonAddBook />
      <div className="end-Pages"></div>
    </div>
  );
};

export default HomePage;
