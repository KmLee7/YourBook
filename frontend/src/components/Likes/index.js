import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as likeActions from "../../store/likes";
import { currentUser } from "../../store/session";
import "./Likes.css";
// import { AiOutlineLike } from "react-icons/ai";
import { FiThumbsUp } from "react-icons/fi";

function Likes({ postId }) {
  const dispatch = useDispatch();
  const [bool, setBool] = useState(false);
  const [check, setCheck] = useState(false);
  const [checkCurrent, setCheckCurrent] = useState(false);

  const currentUserId = useSelector((state) => state.session.currentUserId);
  const allLikes = useSelector((state) => state.entities.likes);
  const allLikeLiked = Object.values(allLikes).map((like) => like.liked);
  const likeLiked = allLikeLiked.map((liked) => liked);
  console.log(
    allLikes,
    "ALL THE LIKES",
    currentUserId,
    "THIS THE CURRENT USER ID",
    allLikeLiked.map((likeLiked) => likeLiked),
    "THIS IS THE ALL LIKE LIKED"
  );
  useEffect(() => {
    dispatch(likeActions.fetchLikes());
  }, []);
  useEffect(() => {
    Object.values(allLikes).map((like) => {
      if (
        like.user_id === currentUserId &&
        like.post_id === postId &&
        like.liked
      ) {
        setCheck(true);
        return true;
      }
    });
  }, [allLikes]);
  console.log(checkCurrent, "THIS THE CHECK CURRENT VAR");
  const handleClick = (e) => {
    e.preventDefault();
    setBool(!bool);

    const newlike = {
      liked: bool,
      post_id: postId,
      user_id: currentUserId,
    };
    if (check === false) {
      dispatch(likeActions.createLike(newlike));
      setCheck(true);
      console.log("hitting first one");
    } else {
      let oldLike;
      console.log(postId);
      Object.values(allLikes).map((like) => {
        if (like.user_id === currentUserId && like.post_id === postId) {
          console.log(like.id);
          oldLike = like;
          oldLike.liked = bool;
        }
      });
      dispatch(likeActions.updateLike(oldLike));

      console.log(oldLike, "oldlike");
      console.log("hitting second one");
    }
  };

  return (
    <>
      <button
        className={`post-likes-button ${bool ? "active" : "inactive"}`}
        onClick={handleClick}
      >
        {bool ? (
          <FiThumbsUp size={22} style={{ fill: "#006cfa" }} />
        ) : (
          <FiThumbsUp size={22} />
        )}
        <div style={{ width: "10px" }}></div>{" "}
        <div style={{ fontSize: "20px" }}>Like</div>
      </button>
    </>
  );
}

export default Likes;
