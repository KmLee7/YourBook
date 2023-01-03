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
  const [friendAccept, setFriendAccept] = useState(false);
  const [show, setShow] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const tempId = currentUser?.id ? currentUser.id : null;

  //tempId is the profile id
  //currentUserId is the session user id

  //receiver_id is the profile id
  //sender_id is the session user id

  //Friend
  //needs to show Friend if either sender_id is equal to session user id or
  //receiver_id is equal to profile_id
  //Or if either sender_id is equal to profile_id or
  //receiver_id is equal to session user id

  useEffect(() => {
    dispatch(friendActions.fetchFriends());
  }, []);

  useEffect(() => {
    Object.values(allFriends)?.map((friend) => {
      // Pending // Check
      // Check is boolean for if pending is true
      // and if receiver id is equal to receiver id is equal to profile id
      // check = (pending and receiver id = profile id)
      if (friend.pending && friend.receiver_id === tempId) {
        setCheck(true);
      } else {
        setCheck(false);
      }
      // SelfCheck
      // boolean to check if session user id is equal to profile id
      // if true then dont show the friends functionality
      if (currentUserId === tempId) {
        setSelfCheck(true);
      } else {
        setSelfCheck(false);
      }
      // FriendRequest
      // boolean to check if its pending and if the sender id is either session user id or
      // profile id
      // also needs to check if its pending and if the receiver id is either session user id or
      // profile id
      // needs to render accept or decline if pending is true
      // needs to render add friend option if pending is false
      if (
        friend.sender_id === tempId ||
        // friend.sender_id === currentUserId ||
        friend.receiver_id === tempId
        // friend.receiver_id === currentUserId
      ) {
        setFriendAccept(true);
      } else {
        setFriendAccept(false);
      }
    });
  });

  const handleClick = (e) => {
    e.preventDefault();
    // setBool(!bool);
    setBoolTwo(!boolTwo);
    setFriendAccept(true);
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
    setFriendAccept(true);
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
        if (oldFriend.accept === true && oldFriend.pending === false) {
          setShow(true);
        } else {
          setShow(false);
        }
      }
      dispatch(friendActions.updateFriend(oldFriend));
    });
  };

  const handleDecline = (e) => {
    e.preventDefault();
    // setBool(!bool)
    setBool(boolTwo);
    setFriendAccept(true);
    let oldFriend;
    Object.values(allFriends)?.map((friend) => {
      if (
        friend.pending &&
        friend.receiver_id === currentUserId &&
        friend.sender_id === tempId
      ) {
        oldFriend = friend;
        oldFriend.pending = boolTwo;
        if (oldFriend.pending === false && oldFriend.accept === false) {
          setShow(true);
        } else {
          setShow(false);
        }
      }
      dispatch(friendActions.updateFriend(oldFriend));
    });
  };

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
          {!check && friendAccept && show && (
            <div style={{ display: "flex" }}>
              <button onClick={handleAccept}>Accept</button>
              <div style={{ width: "10px" }}></div>
              <button onClick={handleDecline}>Decline</button>
            </div>
          )}
          {/* only show add friend if show is false and friendRequest is false
          and check is false */}
          {!show && !check && !friendAccept && (
            <div style={{ display: "flex" }}>
              <button className="add-friends" onClick={handleClick}>
                Add Friend
              </button>
              <div style={{ width: "10px" }}></div>
            </div>
          )}
          {friendAccept && <div>Friend</div>}
        </div>
      )}
    </>
  );
}

export default Friends;
