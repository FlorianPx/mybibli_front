import React from "react";

import "../../assets/style/Global.css";

const SearchBar = ({ input: keyword, onChange: setKeyword }) => {
  return (
    <div className="label-input-form-search">
      <input
        className="input-form-search"
        value={keyword}
        placeholder={"Entrer le titre ou l'auteur du livre"}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
