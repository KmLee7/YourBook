import csrfFetch from "./csrf";
import { SET_CURRENT_USER } from "./session";

export const RECEIVE_FRIENDS = "friends/RECEIVE_FRIENDS";
export const RECEIVE_FRIEND = "friends/RECEIVE_FRIEND";
export const REMOVE_FRIEND = "friends/REMOVE_FRIEND";

export const receiveFriends = (friends) => ({
  type: RECEIVE_FRIENDS,
  friends,
});

export const receiveFriend = (friend) => ({
  type: RECEIVE_FRIEND,
  friend,
});

export const removeFriend = (friendId) => ({
  type: REMOVE_FRIEND,
  friendId,
});

export const getFriend =
  (friendId) =>
  ({ friends }) =>
    friends ? friends[friendId] : null;

export const getFriends = ({ friends }) =>
  friends ? Object.values(friends) : [];

export const fetchFriends = () => async (dispatch) => {
  const res = await csrfFetch("/api/friends");
  const data = await res.json();
  dispatch(receiveFriends(data));
};

export const fetchFriend = (friendId) => async (dispatch) => {
  const res = await csrfFetch(`/api/friend/${friendId}`);
  const data = await res.json();
  dispatch(receiveFriend(data));
};

export const createFriend = (friend) => async (dispatch) => {
  console.log(friend, "hitting herere");
  const res = await csrfFetch("/api/friends", {
    method: "POST",
    body: JSON.stringify(friend),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(receiveFriend(data));
};

export const updateFriend = (friend) => async (dispatch) => {
  const res = await csrfFetch(`/api/friends/${friend.id}`, {
    method: "PUT",
    body: JSON.stringify(friend),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(receiveFriend(data));
};

export const deleteFriend = (friendId) => async (dispatch) => {
  const res = await csrfFetch(`/api/friends/${friendId}`, {
    method: "DELETE",
  });
  dispatch(removeFriend(friendId));
};

const friendsReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case SET_CURRENT_USER:
      if (!action.friends) return state;
    case RECEIVE_FRIENDS:
      return { ...nextState, ...action.friends };
    case RECEIVE_FRIEND:
      nextState[action.friend.id] = action.friend;
      return nextState;
    case REMOVE_FRIEND:
      delete nextState[action.friendId];
      return nextState;
    default:
      return state;
  }
};

export default friendsReducer;
