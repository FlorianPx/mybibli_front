import React from "react";
import { useHistory } from "react-router-dom";
import Add from "../icons/Add";

import "../../assets/style/Global.css";

const ButtonAddBook = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/addbook");
  };

  return (
    <button
      type="button"
      className="button-buttonAddBook"
      onClick={handleClick}
      title="Add book"
    >
      <Add className="image-buttonAddBook" />
    </button>
  );
};

export default ButtonAddBook;
