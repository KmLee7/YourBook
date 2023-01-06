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

  const [selfCheck, setSelfCheck] = useState(false);

  const [pend, setPend] = useState(false);
  const [option, setOption] = useState(false);
  const [qwerty, setQwerty] = useState(false);
  const [result, setResult] = useState(false);

  const tempId = currentUser?.id ? currentUser.id : null;
  console.log(tempId);

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
      console.log(friend.sender_id, "sender id");
      console.log(tempId, "tempId");
      console.log(friend.receiver_id, "receiver id");
      console.log(currentUserId, "user id");
      if (tempId === currentUserId) {
        setSelfCheck(true);
      } else if (
        friend.pending &&
        tempId !== friend.sender_id &&
        tempId !== friend.receiver_id
      ) {
        setPend(false);
      }
      if (!pend && tempId !== friend.receiver_id) {
        console.log(!pend);
        console.log(tempId !== friend.receiver_id);
        setQwerty(true);
      } else {
        setOption(false);
        setQwerty(false);
      }
    });
  }, [allFriends]);

  const handleClick = (e) => {
    e.preventDefault();
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
        // if (oldFriend.accept === true && oldFriend.pending === false) {
        //   setShow(true);
        // } else {
        //   setShow(false);
        // }
      }
      dispatch(friendActions.updateFriend(oldFriend));
    });
  };

  const handleDecline = (e) => {
    e.preventDefault();
    // setBool(!bool)
    setBool(boolTwo);
    let oldFriend;
    Object.values(allFriends)?.map((friend) => {
      if (
        friend.pending &&
        friend.receiver_id === currentUserId &&
        friend.sender_id === tempId
      ) {
        oldFriend = friend;
        oldFriend.pending = boolTwo;
      }
      dispatch(friendActions.updateFriend(oldFriend));
    });
  };
  console.log(pend, "pend");
  console.log(option, "option");
  console.log(qwerty, "qwerty");

  return (
    <>
      {!selfCheck && (
        <div>
          {pend && (
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
          <div>
            {option && (
              <div style={{ display: "flex" }}>
                <button onClick={handleAccept}>Accept</button>
                <div style={{ width: "10px" }}></div>
                <button onClick={handleDecline}>Decline</button>
              </div>
            )}
          </div>
          <div>
            {qwerty && (
              <div style={{ display: "flex" }}>
                <button className="add-friends" onClick={handleClick}>
                  Add Friend
                </button>
                <div style={{ width: "10px" }}></div>
              </div>
            )}
            {result && <div>Friend</div>}
          </div>
        </div>
      )}
    </>
  );
}

export default Friends;
