import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import BookList from "./BookList";
import axios from "axios";

import "../../assets/style/Global.css";
import TopNavbar from "../navbar/TopNavbar";
import BottomNavbar from "../navbar/BottomNavbar";
import ButtonAddBook from "../navbar/ButtonAddBook";

const SearchPage = () => {
  const [input, setInput] = useState("");
  const [bookListDefault, setBookListDefault] = useState([]);
  const [bookList, setBookList] = useState([]);

  const fetchData = async () => {
    return await axios
      .get(`${process.env.REACT_APP_URL_API}books`)
      .then((data) => {
        setBookList(data.data);
        setBookListDefault(data.data);
      });
  };

  const updateInput = async (input) => {
    const filtered = bookListDefault.filter((book) => {
      return (
        book.title.toLowerCase().includes(input.toLowerCase()) ||
        book.author.toLowerCase().includes(input.toLowerCase())
      );
    });
    setInput(input);
    setBookList(filtered);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper-Pages">
      <TopNavbar />
      <h2 className="title-searchPage">Rechercher un livre</h2>
      <SearchBar input={input} onChange={updateInput} />
      <BookList bookList={bookList} />
      <ButtonAddBook />
      <BottomNavbar />
    </div>
  );
};

export default SearchPage;
