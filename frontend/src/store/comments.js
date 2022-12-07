import { GrActions } from "react-icons/gr";
import csrfFetch from "./csrf";
import { SET_CURRENT_USER } from "./session";

export const RECEIVE_COMMENTS = "comments/RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "comments/RECEIVE_COMMENT";
export const REMOVE_COMMENT = "comments/REMOVE_COMMENT";

export const receiveComments = ({ comments }) => ({
  type: RECEIVE_COMMENTS,
  comments,
});
export const receiveComment = (comment) => ({
  type: RECEIVE_COMMENT,
  comment,
});
export const removeComment = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId,
});

export const getComment =
  (commentId) =>
  ({ comments }) =>
    comments ? comments[commentId] : null;

export const getComments = ({ comments }) =>
  comments ? Object.values(comments) : [];

export const fetchComments = () => async (dispatch) => {
  const res = await csrfFetch("/api/comments");
  const data = await res.json();

  dispatch(receiveComments(data));
  return data;
};

export const fetchComment = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${commentId}`);
  const data = await res.json();

  dispatch(receiveComment(data));
};
export const getPostComments = (postId) => (state) =>
  Object.values(state.entities.comments)
    .filter((comment) => comment.postId === postId)
    .map((comment) => ({
      ...comment,
      author: state.users[comment.authorId]?.username,
    }));

export const createComment = (comment) => async (dispatch) => {
  // let newComment = { body: comment.body };
  console.log("helllor hits here");
  const res = await csrfFetch("/api/comments/", {
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("helleooejoeo");
  const data = await res.json();
  dispatch(receiveComment(data));
};

export const updateComment = (comment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    body: JSON.stringify(comment),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(receiveComment(data));
};

export const deleteComment = (commentId) => async (dispatch) => {
  const res = await csrfFetch(`api/comments/${commentId}`, {
    method: "DELETE",
  });
  dispatch(removeComment(commentId));
};

const commentsReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case SET_CURRENT_USER:
      if (!action.comments) return state;
    case RECEIVE_COMMENTS:
      return { ...nextState, ...action.comments };
    case RECEIVE_COMMENT:
      // const comment = action.comment;
      nextState[action.comment.id] = action.comment;
      return nextState;
    // return { ...state, [comment.id]: comment };
    case REMOVE_COMMENT:
      delete nextState[action.commentId];
      return nextState;
    default:
      return state;
  }
};

export default commentsReducer;
