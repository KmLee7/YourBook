import { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./SearchBar.css";

function SearchBar({ placeholder, data }) {
  const currentUserId = useSelector((state) => state.session.currentUserId);
  const history = useHistory();
  const [filter, setFilter] = useState([]);
  const [serachInput, setSearchInput] = useState("");

  const users = useSelector((state) => state.entities.users);
  let tempUsers = Object.values(users);
  // console.log(tempUsers);
  let names = [];
  for (let i = 0; i < tempUsers.length; i++) {
    names.push(tempUsers[i].first_name);
  }
  // console.log(names);
  const handleFilter = (e) => {
    e.preventDefault();
    const searchInput = e.target.value;
    const newFilter = data.filter((user) => {
      return (
        user.first_name.toLowerCase() +
        " " +
        user.last_name.toLowerCase()
      ).startsWith(searchInput.toLowerCase());
    });
    if (searchInput === "") {
      setFilter([]);
    } else {
      setFilter(newFilter);
    }
  };

  return (
    <>
      <div className="search">
        <div className="searchInputs">
          <CgSearch
            className="search-icon"
            size={20}
            style={{ paddingLeft: "10px", color: "black" }}
          />
          <input
            type="text"
            placeholder={placeholder}
            onChange={handleFilter}
          />
        </div>
        {filter.length !== 0 && (
          <div
            className="dataResult"
            style={{ height: "100px", marginLeft: "22px" }}
          >
            {filter.slice(0, 10).map((user) => {
              if (currentUserId !== user.id) {
                return (
                  <button
                    key={user.id}
                    className="dataItem"
                    style={{
                      height: "35px",
                      width: "200px",
                      marginLeft: "15px",
                    }}
                    onClick={() => {
                      history.push(`/ProfilePage/${user.id}`);
                    }}
                  >
                    <div className="search-user-wrapper">
                      <FaUserCircle
                        className="user-for-search"
                        size={20}
                        color="black"
                      />
                      <div style={{ width: "10px" }}></div>
                      <div className="user-name">
                        {user.first_name} {user.last_name}
                      </div>
                    </div>
                  </button>
                );
              }
            })}

            <div style={{ height: "10px" }}></div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;
