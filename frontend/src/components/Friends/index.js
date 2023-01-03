import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as friendActions from "../../store/friends";

function Friends({ currentUser }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.session.currentUserId);
  const allFriends = useSelector((state) => state.entities.friends);
  const { id } = useParams();
  const [bool, setBool] = useState(false);
  const [boolTwo, setBoolTwo] = useState(false);
  const [check, setCheck] = useState(false);
  const tempId = currentUser?.id ? currentUser.id : null;
  localStorage.setItem("profileId", tempId);
  // console.log(localStorage.getItem("profileId") === `${currentUser.id}`);

  useEffect(() => {
    dispatch(friendActions.fetchFriends());
  }, []);

  useEffect(() => {
    Object.values(allFriends)?.map((friend) => {
      if (friend.pending && friend.receiver_id === tempId) {
        console.log(
          friend.pending && friend.receiver_id === tempId,
          "hello sadfijo"
        );
        setCheck(true);
      } else {
        console.log(friend.pending && friend.receiver_id === tempId, "bye");
        setCheck(false);
      }
    });
  });

  const handleClick = (e) => {
    e.preventDefault();
    // setBool(!bool);
    setBoolTwo(!boolTwo);
    const addFriend = {
      sender_id: currentUserId,
      receiver_id: currentUser.id,
      accept: bool,
      pending: !boolTwo,
    };

    if (addFriend.pending) {
      dispatch(friendActions.createFriend(addFriend));
    }
  };

  return (
    <>
      {check ? (
        <div
          style={{
            display: "flex",
            width: "75px",
            height: "25px",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid black",
            backgroundColor: "rgb(12, 109, 195)",
            borderRadius: "6px",
            color: "white",
          }}
        >
          pending
        </div>
      ) : (
        <button className="add-friends" onClick={handleClick}>
          Add Friend
        </button>
      )}
    </>
  );
}

export default Friends;
