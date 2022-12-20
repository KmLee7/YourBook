import csrfFetch from "./csrf";
import { SET_CURRENT_USER } from "./session";

export const RECEIVE_LIKES = "likes/RECEIVE_LIKES";
export const RECEIVE_LIKE = "likes/RECEIVE_LIKE";
export const REMOVE_LIKE = "likes/REMOVE_LIKE";

export const receiveLikes = (likes) => ({
  type: RECEIVE_LIKES,
  likes,
});

export const receiveLike = (like) => ({
  type: RECEIVE_LIKE,
  like,
});
export const removeLike = (likeId) => ({
  type: REMOVE_LIKE,
  likeId,
});

export const getLike =
  (likeId) =>
  ({ likes }) =>
    likes ? likes[likeId] : null;

export const getLikes = ({ likes }) => (likes ? Object.values(likes) : []);

export const fetchLikes = () => async (dispatch) => {
  const res = await csrfFetch("/api/likes");
  const data = await res.json();

  dispatch(receiveLikes(data));
};

export const fetchLike = (likeId) => async (dispatch) => {
  const res = await csrfFetch(`/api/likes/${likeId}`);
  const data = await res.json();

  dispatch(receiveLike(data));
};

export const createLike = (like) => async (dispatch) => {
  console.log("hello");
  const res = await csrfFetch("/api/likes", {
    method: "POST",
    body: JSON.stringify(like),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(receiveLike(data));
};
export const updateLike = (like) => async (dispatch) => {
  console.log("something");
  const res = await csrfFetch(`/api/likes/${like.id}`, {
    method: "PUT",
    body: JSON.stringify(like),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(receiveLike(data));
};

export const deleteLike = (likeId) => async (dispatch) => {
  const res = await csrfFetch(`api/likes/${likeId}`, {
    method: "DELETE",
  });
  dispatch(removeLike(likeId));
};

const likesReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case SET_CURRENT_USER:
      if (!action.likes) return state;
    case RECEIVE_LIKES:
      return { ...nextState, ...action.likes };
    case RECEIVE_LIKE:
      nextState[action.like.id] = action.like;
      return nextState;
    case REMOVE_LIKE:
      delete nextState[action.likeId];
      return nextState;
    default:
      return state;
  }
};

export default likesReducer;
