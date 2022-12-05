import { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { getUsers } from "../../store/user";
import "./SearchUser.css";

// const SearchUser = () => {
function SearchBar({ placeholder, data }) {
  const history = useHistory();
  const [filter, setFilter] = useState([]);
  const [serachInput, setSearchInput] = useState("");

  const users = useSelector((state) => state.entities.users);
  let tempUsers = Object.values(users);
  console.log(tempUsers);
  let names = [];
  for (let i = 0; i < tempUsers.length; i++) {
    names.push(tempUsers[i].first_name);
  }
  console.log(names);
  const handleFilter = (e) => {
    e.preventDefault();
    const searchInput = e.target.value;
    const newFilter = data.filter((user) => {
      return (
        user.first_name.toLowerCase() +
        " " +
        user.last_name.toLowerCase()
      ).includes(searchInput.toLowerCase());
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
          <CgSearch size={20} style={{ color: "black" }} />
          <input
            type="search"
            placeholder={placeholder}
            onChange={handleFilter}
          />
        </div>
        {filter.length !== 0 && (
          <div className="dataResult">
            {filter.slice(0, 10).map((user) => {
              return (
                <button
                  className="dataItem"
                  style={{ height: "35px" }}
                  onClick={() => {
                    history.push(`/ProfilePage/${user.id}`);
                  }}
                >
                  {user.first_name} {user.last_name}
                </button>
              );
            })}
            <div style={{ height: "10px" }}></div>
          </div>
        )}
      </div>
    </>
  );
  //   useEffect(() => {
  //     let search = window.location.search;
  //     let params = new URLSearchParams(search);
  //     let name = params.get("q");
  //     console.log(search, "this is the search");
  //     console.log(name, "this is the name");

  //     console.log(allUsers, "this is all ysser");

  //     if (name) {
  //       console.log("hello2");
  //       let matches = Object.values(users)
  //         .filter((user) => {
  //           let username = user.first_name.toLowerCase();
  //           return username.startsWith(name.toLowerCase());
  //         })
  //         .sort((a, b) => {
  //           return a.first_name - b.first_name;
  //         });
  //       let matches2 = Object.values(users)
  //         .filter((user) => {
  //           let username = user.first_name.toLowerCase();
  //           let contains = false;
  //           for (let i = 1; i < username.length; i++) {
  //             if (username[i].startsWith(name.toLowerCase())) {
  //               contains = true;
  //             }
  //           }
  //           return contains;
  //         })
  //         .sort((a, b) => {
  //           return a.name.length - b.name.length;
  //         });
  //       matches = matches.concat(matches2);
  //       setAllUsers(matches);
  //       console.log(allUsers, "this is all yser");
  //     }
  //   }, [location, users]);

  //   return (
  //     <>
  //       <input type="search" placeholder="Hello" />
  //       {allUsers.length > 0 &&
  //         allUsers.map((user) => {
  //           return (
  //             <div
  //               onClick={() => {
  //                 history.push(`/ProfilePage/${user.id}`);
  //               }}
  //             >
  //               {user.first_name}
  //             </div>
  //           );
  //         })}
  //     </>
  //   );
}

export default SearchBar;
// export default SearchUser;
