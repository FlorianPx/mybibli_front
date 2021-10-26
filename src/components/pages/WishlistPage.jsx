import React, { useEffect, useState } from "react";
import { useAuthState } from "../../context/AuthProvider";
import axios from "axios";

import ButtonAddBook from "../navbar/ButtonAddBook";

import "../../assets/style/Global.css";
import Delete from "../../assets/images/svg/trash.svg";

const WishlistPage = () => {
  const { user } = useAuthState();

  const [books, setBooks] = useState([""]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}users/${user.id}/books/mywishlist`)
      .then((response) => response.data)
      .then((data) => setBooks(data));
  }, [user.id]);

  const handleDeleteClick = (book) => {
    console.log({ book });
    axios
      .delete(
        `${process.env.REACT_APP_URL_API}users/books/${book.userBook_id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(() => {
        const newBooks = books.filter(
          (b) => b.userBook_id !== book.userBook_id
        );
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
            </div>
          </article>
        ))}
      </div>
      <ButtonAddBook />
      <div className="end-Pages"></div>
    </div>
  );
};

export default WishlistPage;
