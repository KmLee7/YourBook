import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as friendActions from "../../store/friends";

function Friends({ currentUser }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUserId = useSelector((state) => state.session.currentUserId);
  const allFriends = useSelector((state) => state.entities.friends);
  const [bool, setBool] = useState(false);

  console.log(currentUserId, "this is the currentUserId");
  //   console.log(, "THIS IS THE CURRENT USER FROM PROFILE PAGE");

  useEffect(() => {
    dispatch(friendActions.fetchFriends());
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setBool(!bool);
    const addFriend = {
      sender_id: currentUserId,
      receiver_id: currentUser.id,
      accept: !bool,
    };
    if (addFriend.accept) {
      dispatch(friendActions.createFriend(addFriend));
    }
  };
  return (
    <>
      <button className="add-friends" onClick={handleClick}>
        Add Friend
      </button>
    </>
  );
}

export default Friends;
