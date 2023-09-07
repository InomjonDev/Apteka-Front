import React, { useState } from "react";
import Table from "../../components/Table/Table";
import Search from "../../components/Search/Search";

function Delete() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = value => {
    setSearchValue(value);
  };
  return (
    <div>
      {/* <CardWrapper isDelete={true} /> */}
      <Search onSearch={handleSearch} />
      <Table isDelete={true} searchValue={searchValue} />
    </div>
  );
}

export default Delete;
