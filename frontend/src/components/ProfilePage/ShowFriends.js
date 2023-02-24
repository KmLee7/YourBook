import { useEffect } from "react";
// import { FaUserCircle } from "react-icons/fa";
import { BsPersonSquare } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import * as friendActions from "../../store/friends";
import * as sessionActions from "../../store/session";

function ShowFriends() {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.session.currentUserId);
  const profilePageId = Number(
    history.location.pathname.split("/ProfilePage/")[1]
  );
  const profileOwner = useSelector(
    (state) => state.entities.users[profilePageId]
  );
  const currentUser = useSelector(
    (state) => state.entities.users[currentUserId]
  );

  const allUsers = useSelector((state) => state.entities.users);
  const allFriends = useSelector((state) => state.entities.friends);
  console.log(allUsers, "from show friends");
  console.log(allFriends);
  console.log(currentUser);
  useEffect(() => {
    dispatch(friendActions.fetchFriends());
  }, []);

  const profileOwnerFriends = Object.values(allFriends).map((friend) => {
    let username;
    let userId;
    if (friend?.receiver_id === profilePageId) {
      Object.values(allUsers).map((user) => {
        if (user?.id === friend?.sender_id) {
          userId = user?.id;
          username = user.first_name + " " + user.last_name;
        }
      });
    } else if (friend?.sender_id === profilePageId) {
      Object.values(allUsers).map((user) => {
        if (user?.id === friend?.receiver_id) {
          userId = user?.id;
          username = user.first_name + " " + user.last_name;
        }
      });
    } else {
      return null;
    }
    return (
      <>
        <div
          key={userId}
          className="friend-logo-name"
          onClick={() => {
            history.push(`/ProfilePage/${userId}`);
            window.location.reload();
          }}
        >
          {/* <FaUserCircle size={45} /> */}
          <BsPersonSquare size={50} />
          <div className="line-break1h"></div>
          <div className="friendUsername">{username}</div>
          <div style={{ width: "10px" }}></div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="outerContainer">
        <div className="innerContainer">{profileOwnerFriends}</div>
      </div>
    </>
  );
}

export default ShowFriends;
