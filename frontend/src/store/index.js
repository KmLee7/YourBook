import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import commentsReducer from "./comments";
import postsReducer from "./posts";
import sessionReducer from "./session";
import userReducer from "./user";
import likesReducer from "./likes";

const entityReducer = combineReducers({
  users: userReducer,
  posts: postsReducer,
  comments: commentsReducer,
  likes: likesReducer,
});

const rootReducer = combineReducers({
  entities: entityReducer,
  session: sessionReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
