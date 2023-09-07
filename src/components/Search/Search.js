import React, { useState } from "react";
import "./Search.css";

function Search({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = e => {
    e.preventDefault();
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="search">
      <input
        type="search"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
