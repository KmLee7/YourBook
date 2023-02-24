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

  const [show, setShow] = useState(false);

  const currentUserId = useSelector((state) => state.session.currentUserId);
  const allLikes = useSelector((state) => state.entities.likes);

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

      setCheck(true);
    } else {
      let oldLike;

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
