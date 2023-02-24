import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as friendActions from "../../store/friends";
import "./Friends.css";

function Friends() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [addFriend, setAddFriend] = useState(false);
  const [show, setShow] = useState(false);
  const currentUserId = useSelector((state) => state.session.currentUserId);
  const allFriends = useSelector((state) => state.entities.friends);
  const profilePageId = Number(
    history.location.pathname.split("/ProfilePage/")[1]
  );
  const profileOwner = useSelector(
    (state) => state.entities.users[profilePageId]
  );
  const currentUser = useSelector(
    (state) => state.entities.users[currentUserId]
  );

  useEffect(() => {
    dispatch(friendActions.fetchFriends());
  }, []);

  useEffect(() => {
    Object.values(allFriends)?.map((friend) => {
      if (currentUserId !== profilePageId) {
        if (
          friend.receiver_id === currentUserId ||
          friend.sender_id === currentUserId
        ) {
          if (
            friend.receiver_id === profilePageId ||
            friend.sender_id === profilePageId
          ) {
            setShow(true);
          }
        }
      }
    });
  }, [allFriends]);

  const handleClick = (e) => {
    e.preventDefault();
    setAddFriend(!addFriend);
    const newFriend = {
      sender_id: currentUserId,
      receiver_id: profilePageId,
      accept: !addFriend,
      pending: !addFriend,
    };
    if (newFriend.accept) {
      dispatch(friendActions.createFriend(newFriend));
    }
  };
  const handleDeleteFriend = (e) => {
    e.preventDefault();
    Object.values(allFriends)?.map((friend) => {
      if (
        (friend?.sender_id === currentUserId &&
          friend?.receiver_id === profilePageId) ||
        (friend?.sender_id === profilePageId &&
          friend?.receiver_id === currentUserId)
      ) {
        dispatch(friendActions.deleteFriend(friend.id));
        setShow(false);
      }
    });
  };

  return (
    <>
      {currentUserId !== profileOwner?.id && !show ? (
        <button className="addFriendButton" onClick={handleClick}>
          Add Friend
        </button>
      ) : null}
      {show && (
        <div className="friendAndDeleteWrapper">
          <div className="friend">Friend</div>
          <div style={{ width: "10px" }}></div>
          <button className="deleteFriendDiv" onClick={handleDeleteFriend}>
            Delete Friend
          </button>
        </div>
      )}
    </>
  );
}

export default Friends;
