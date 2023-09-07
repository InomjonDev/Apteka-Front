import React, { useState } from "react";
import "./Home.css";
import Table from "../../components/Table/Table";
import Search from "../../components/Search/Search";

function Home() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = value => {
    setSearchValue(value);
  };

  return (
    <div className="home">
      {/* <div className="home__sidebar">
        <Sidebar />
      </div>
      <div className="home__content">
        <Routes>
          <Route path="/" element={<CardWrapper data={data} />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div> */}
      {/* <CardWrapper data={data} isDelete={false} /> */}
      <Search onSearch={handleSearch} />
      <Table sale={true} searchValue={searchValue} />
    </div>
  );
}

export default Home;
