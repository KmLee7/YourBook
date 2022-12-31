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
  // const [checkCurrent, setCheckCurrent] = useState(false);
  const [show, setShow] = useState(false);

  const currentUserId = useSelector((state) => state.session.currentUserId);
  const allLikes = useSelector((state) => state.entities.likes);
  // const allLikeLiked = Object.values(allLikes).map((like) => like.liked);
  // const likeLiked = allLikeLiked.map((liked) => liked);
  // console.log(
  //   allLikes,
  //   "ALL THE LIKES",
  //   currentUserId,
  //   "THIS THE CURRENT USER ID",
  //   allLikeLiked.map((likeLiked) => likeLiked),
  //   "THIS IS THE ALL LIKE LIKED"
  // );

  useEffect(() => {
    dispatch(likeActions.fetchLikes());
  }, []);

  useEffect(() => {
    Object.values(allLikes)?.map((like) => {
      if (like.user_id === currentUserId && like.post_id === postId) {
        setCheck(true);
        if (like.liked === true) {
          setShow(true);
        } else {
          setShow(false);
        }
      }
    });
  }, [allLikes]);
  // console.log(checkCurrent, "THIS THE CHECK CURRENT VAR");
  const handleClick = (e) => {
    e.preventDefault();
    setBool(!bool);
    const newlike = {
      liked: !bool,
      post_id: postId,
      user_id: currentUserId,
    };
    if (check === false) {
      dispatch(likeActions.createLike(newlike));
      // console.log("hits here, in the like section");
      setCheck(true);
    } else {
      let oldLike;

      // console.log(bool, "BOOL IF CHECK IS TRUE");
      Object.values(allLikes).map((like) => {
        if (like.user_id === currentUserId && like.post_id === postId) {
          oldLike = like;
          oldLike.liked = !bool;
          if (oldLike.liked === true) {
            setShow(true);
          } else {
            setShow(false);
          }
        }
      });
      dispatch(likeActions.updateLike(oldLike));

      // console.log(oldLike, "oldlike");
      // console.log("hitting second one");
    }
  };

  return (
    <>
      <button
        className={`post-likes-button ${show ? "active" : "inactive"}`}
        onClick={handleClick}
      >
        {show ? (
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
