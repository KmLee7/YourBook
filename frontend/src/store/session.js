import csrfFetch from "./csrf.js";

export const SET_CURRENT_USER = "session/setCurrentUser";
export const REMOVE_CURRENT_USER = "session/removeCurrentUser";

const setCurrentUser = ({ user }) => ({
  type: SET_CURRENT_USER,
  user,
});

const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER,
});

const storeCSRFToken = (response) => {
  const csrfToken = response.headers.get("X-CSRF-Token");
  if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
};

const storeCurrentUser = (user) => {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
};

export const login =
  ({ credential, password }) =>
  async (dispatch) => {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password }),
    });
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data));
    return response;
  };

export const restoreSession = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  storeCSRFToken(response);
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data));
  return response;
};

export const signup = (user) => async (dispatch) => {
  console.log("hits singup session", user);
  // const { firstName, lastName, email, password, birthday, gender } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      // user: {
      //   firstName,
      //   lastName,
      //   email,
      //   password,
      //   birthday,
      //   gender,
      // }
      user,
    }),
  });
  const data = await response.json();
  storeCurrentUser(data.user);
  dispatch(setCurrentUser(data));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch(`/api/session/`, {
    method: "DELETE",
  });
  storeCurrentUser(null);
  dispatch(removeCurrentUser());
  return response;
};
export const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
const initialState = {
  currentUserId: currentUser ? currentUser.id : currentUser,
};

const sessionReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_CURRENT_USER:
      if (!action.user) return state;
      newState = { ...state, currentUserId: action.user.id };
      return newState;
    case REMOVE_CURRENT_USER:
      newState = { ...state, currentUserId: null };
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
