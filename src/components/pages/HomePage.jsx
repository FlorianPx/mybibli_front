import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "../../context/AuthProvider";

import TopNavbar from "../navbar/TopNavbar";
import BottomNavbar from "../navbar/BottomNavbar";
import ButtonAddBook from "../navbar/ButtonAddBook";
import Heart from "../icons/Heart";

import "../../assets/style/Global.css";
import Delete from "../../assets/images/svg/remove.svg";

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
      .delete(`${process.env.REACT_APP_URL_API}books/${book.book_id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(() => {
        const newBooks = books.filter((b) => b.book_id !== book.book_id);
        setBooks(newBooks);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="wrapper-Pages">
      <TopNavbar />
      <div className="wrapper-card-Pages">
        {books.map((book) => (
          <article
            className="card-Pages"
            key={`${book.title} de ${book.author}`}
          >
            <button
              type="button"
              className="delete-button-Pages"
              onClick={() => handleDeleteClick(book)}
            >
              <img
                src={Delete}
                alt="Logo supprimer"
                className="delete-logo-Pages"
              />
            </button>
            <button>
              <Heart
                className={
                  book.favorite === "true" ? "favorite-book" : "nofavorite-book"
                }
              />
            </button>
            <h3 className="title-card-Pages">{book.title}</h3>
            <p className="author-card-Pages">{`De ${book.author}`}</p>
            <img
              src={book.img}
              alt={`Livre ${book.title} de ${book.author}`}
              className="img-card-Pages"
            />
            <p className="type-card-Pages">{book.type}</p>
          </article>
        ))}
      </div>
      <ButtonAddBook />
      <BottomNavbar />
    </div>
  );
};

export default HomePage;
