import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as likeActions from "../../store/likes";
import { currentUser } from "../../store/session";

function Likes({ postId }) {
  const dispatch = useDispatch();
  const [bool, setBool] = useState(false);
  const [check, setCheck] = useState(false);
  const currentUserId = useSelector((state) => state.session.currentUserId);
  const allLikes = useSelector((state) => state.entities.likes);
  console.log(allLikes);
  useEffect(() => {
    dispatch(likeActions.fetchLikes());
  }, []);
  useEffect(() => {
    Object.values(allLikes).map((like) => {
      if (like.user_id === currentUserId && like.post_id === postId) {
        // setCheck(!check);
        setCheck(true);
      }
    });
  }, [allLikes]);

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
      <button onClick={handleClick}>Like</button>
    </>
  );
}

export default Likes;
