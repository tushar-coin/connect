"use client";

import { useState } from "react";

const Header = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const GetUserData = async (e) => {
    e.preventDefault();
    // todo : get users based on search value
    let data = await fetch("/users/search");
    data = await data.json(); // should be array of objects
    setUsers(data);
  };
  return (
    <div>
      <div>
        <div>LOGO</div>
        <div>
          <form onSubmit={GetUserData}>
            <input
              placeholder="search user"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
