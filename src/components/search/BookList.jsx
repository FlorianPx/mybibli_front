import React from "react";

import "../../assets/style/Global.css";

const BookList = ({ bookList }) => {
  return (
    <div className="wrapper-card-Pages">
      {bookList.map((book) => {
        return (
          <article
            key={book.id}
            className="card-Pages"
            key={`${book.title} de ${book.author}`}
          >
            <h3 className="title-card-Pages">{book.title}</h3>
            <p className="author-card-Pages">{`De ${book.author}`}</p>
            <img
              src={book.img}
              alt={`Livre ${book.title} de ${book.author}`}
              className="img-card-Pages"
            />
            <p className="type-card-Pages">{book.type}</p>
          </article>
        );
      })}
    </div>
  );
};

export default BookList;
