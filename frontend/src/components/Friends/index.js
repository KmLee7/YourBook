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
  const [selfCheck, setSelfCheck] = useState(false);
  const [friendRequest, setFriendRequest] = useState(false);
  const [show, setShow] = useState(false);
  const tempId = currentUser?.id ? currentUser.id : null;
  // localStorage.setItem("profileId", tempId);
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
      if (currentUserId === tempId) {
        console.log(currentUserId === tempId, "this is sthete");
        setSelfCheck(true);
      }
      if (friend.pending && friend.sender_id === tempId) {
        {
          console.log("Its hitting true true");
        }
        setFriendRequest(true);
      } else {
        console.log("Its hitting false false");
        setFriendRequest(false);
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
  const handleAccept = (e) => {
    e.preventDefault();
    setBool(bool);
    setBoolTwo(boolTwo);
    let oldFriend;
    Object.values(allFriends)?.map((friend) => {
      if (
        friend.pending &&
        friend.receiver_id === currentUserId &&
        friend.sender_id === tempId
      ) {
        oldFriend = friend;
        oldFriend.accept = !bool;
        oldFriend.pending = boolTwo;
      }
      if (oldFriend?.accept) {
        setShow(true);
        dispatch(friendActions.updateFriend(oldFriend));
      } else {
        setShow(false);
      }
    });
  };
  console.log(allFriends);

  return (
    <>
      {!selfCheck && (
        <div>
          {check && (
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
          )}
          {friendRequest && (
            <div style={{ display: "flex" }}>
              <button onClick={handleAccept}>Accept</button>
              <div style={{ width: "10px" }}></div>
              {/* <button onClick={handleDecline}>Decline</button> */}
            </div>
          )}
          {!check && !friendRequest && !show && (
            <button className="add-friends" onClick={handleClick}>
              Add Friend
            </button>
          )}
          {show && <div>Friend</div>}
        </div>
      )}
    </>
  );
}

export default Friends;
