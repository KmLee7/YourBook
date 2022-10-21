import csrfFetch from "./csrf";
import { SET_CURRENT_USER } from "./session";
import { currentUser } from "./session";

export const RECEIVE_POSTS = "posts/RECEIVE_POSTS";
export const RECEIVE_POST = "posts/RECEIVE_POST";
export const REMOVE_POST = "posts/REMOVE_POST";

export const receivePosts = ({ posts, users }) => ({
  type: RECEIVE_POSTS,
  posts,
  users,
});
export const receivePost = (post) => ({
  type: RECEIVE_POST,
  post,
});
export const removePost = (postId) => ({
  type: REMOVE_POST,
  postId,
});

export const getPost =
  (postId) =>
  ({ posts }) =>
    posts ? posts[postId] : null;

export const getPosts = ({ posts }) => (posts ? Object.values(posts) : []);

export const fetchPosts = () => async (dispatch) => {
  const res = await csrfFetch("/api/posts");
  const data = await res.json();

  dispatch(receivePosts(data));
  return data;
};

export const fetchPost = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}`);
  const data = await res.json();

  dispatch(receivePost(data));
};

export const createPost = (post) => async (dispatch) => {
  let newpost = { content: post.content };
  const res = await csrfFetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(newpost),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(receivePost(data));
};

export const updatePost = (post) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${post.id}`, {
    method: "PUT",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(receivePost(data));
};

export const deletePost = (postId) => async (dispatch) => {
  const res = await csrfFetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  dispatch(removePost(postId));
};

const postsReducer = (state = {}, action) => {
  const nextState = { ...state };
  switch (action.type) {
    case SET_CURRENT_USER:
      if (!action.posts) return state;
    case RECEIVE_POSTS:
      return { ...nextState, ...action.posts };
    case RECEIVE_POST:
      nextState[action.post.id] = action.post;
      return nextState;
    case REMOVE_POST:
      delete nextState[action.postId];
      return nextState;
    default:
      return state;
  }
};

export default postsReducer;
