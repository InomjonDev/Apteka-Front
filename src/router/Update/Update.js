import React, { useState } from "react";
import Table from "../../components/Table/Table";
import Search from "../../components/Search/Search";

function Update() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = value => {
    setSearchValue(value);
  };
  return (
    <div>
      <Search onSearch={handleSearch} />
      <Table update={true} searchValue={searchValue} />
    </div>
  );
}

export default Update;
