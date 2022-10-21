import csrfFetch from "./csrf";
import { SET_CURRENT_USER } from "./session";
import { RECEIVE_POSTS } from "./posts";

export const RECEIVE_USERS = "users/RECEIVE_USERS";
export const RECEIVE_USER = "users/RECEIVE_USER";

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const getUser =
  (userId) =>
  ({ users }) =>
    users ? users[userId] : null;

export const getUsers = ({ users }) => (users ? Object.values(users) : []);

export const fetchUser = (userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${userId}`);
  const data = await res.json();
  dispatch(receiveUser(data.user));
};

export const updateUser = (user) => async (dispatch) => {
  const res = await csrfFetch(`/api/users/${user.id}`, {
    method: "PUT",
    body: JSON.stringify({ user }),
  });

  const data = await res.json();
  dispatch(receiveUser(data.user));
};

const userReducer = (state = {}, action) => {
  let nextState = { ...state };
  switch (action.type) {
    case SET_CURRENT_USER:
      if (!action.user) return state;
    case RECEIVE_USER:
      nextState[action.user.id] = action.user;
      return nextState;
    case RECEIVE_POSTS:
      return { ...nextState, ...action.users };
    default:
      return state;
  }
};

export default userReducer;
