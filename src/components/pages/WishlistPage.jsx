import React, { useEffect, useState } from "react";
import axios from "axios";

import TopNavbar from "../navbar/TopNavbar";
import BottomNavbar from "../navbar/BottomNavbar";

import "../../assets/style/Global.css";
import { useAuthState } from "../../context/AuthProvider";

const WishlistPage = () => {
  const [books, setBooks] = useState([""]);
  const { user } = useAuthState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL_API}users/${user.id}/books/mywishlist`)
      .then((response) => response.data)
      .then((data) => setBooks(data));
  }, [user.id]);

  return (
    <div className="wrapper-Pages">
      <TopNavbar />
      <div className="wrapper-card-Pages">
        {books.map((book) => (
          <article
            className="card-Pages"
            key={`${book.title} de ${book.author}`}
          >
            <h3 className="title-card-Pages">{book.title}</h3>
            <p className="author-card-Pages">{`De ${book.author}`}</p>
            <img
              src={book.img}
              alt={`Livre ${book.title} de ${book.author}`}
              className="image-card-Pages"
            />
            <p className="type-card-Pages">{book.type}</p>
          </article>
        ))}
      </div>
      <BottomNavbar />
    </div>
  );
};

export default WishlistPage;
