import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import NavBar from "../NavBar";
import "../NavBar/NavBar.css";
import Comments from "../Comments";
import PostIndexItem from "../Posts/PostIndexItem";
import PostFormModal from "../Posts/PostFormModal";
import * as postActions from "../../store/posts";
import * as sessionActions from "../../store/session";

function HomePage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.entities.posts);
  const comments = useSelector((state) => state.entities.comments);
  const history = useHistory();
  const users = useSelector((state) => state.entities.users);

  // const sessionUser = useSelector((state) => state.session.currentUserId);
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );

  let userName;
  if (currentUser) {
    userName = currentUser.first_name + " " + currentUser.last_name;
  }

  console.log(users, "this is the users");

  ///Search function
  let tempUsers = Object.values(users);
  let names = [];
  for (let i = 0; i < tempUsers.length; i++) {
    names.push(tempUsers[i].first_name);
  }
  ///

  useEffect(() => {
    dispatch(postActions.fetchPosts());
  }, []);
  useEffect(() => {
    dispatch(sessionActions.restoreSession());
  }, []);

  const PostList = Object.values(posts)
    .reverse()
    .map((post) => {
      return <PostIndexItem key={post.id} post={post} />;
    });

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/ProfilePage/${currentUser.id}`);
  };

  return (
    <>
      <NavBar />
      <div className="home-containers">
        <div className="left-container1">
          <button className="left-profile-button-two" onClick={handleClick}>
            <div className="first-left-con">
              <FaUserCircle size={36} />
              <div style={{ width: "15" }}></div>
              <div className="user-username1">
                {currentUser &&
                  currentUser.first_name + " " + currentUser.last_name}
              </div>
            </div>
          </button>
          {/* <div>Find friends</div>
            <div>Welcome</div>
            <div>Groups</div>
            <div>Marketplace</div>
            <div>Watch</div>
            <div>Memories</div>
            <div>Saved</div>
            <div>Pages</div>
            <div>News</div>
            <div>Events</div>
            <div>See more drop down</div> */}
        </div>
        <div className="mid-container1">
          {/* <div className="feed-top">
              <div>Stories</div>
              <div className="line-break1"></div>
              <div>Reels</div>
              <div className="line-break1"></div>
              <div>Rooms</div>
            </div>
            <div className="feed-bottom">
              <div> Information </div>
            </div> */}
          <div className="line-break2h"></div>
          <div className="post-form">
            <div className="upper">
              <button
                style={{
                  border: "1px solid white",
                  backgroundColor: "white",
                }}
              >
                <FaUserCircle size={33} />
              </button>
              {/* <button
                  className="rightProfileButton"
                  onClick={() => setShowModal(true)}
                >
                  <FaUserCircle size={33} />
                </button>
                {showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                    <RightProfileButton />
                  </Modal>
                )} */}
              <div className="line-break1h"></div>
              <div className="post-form-button">
                <PostFormModal />
              </div>
            </div>
            <div className="line-break4h"></div>
            <div className="border-line1h"></div>
            {/* <div className="bottom">
                <div>Live Video</div>
                <div>Photo/video</div>
                <div>Feeling/activity</div>
              </div> */}
          </div>
          <div className="line-break5h"></div>
          <div className="all-posts">
            <div>{PostList}</div>
          </div>
        </div>
        <div className="right-container1">
          {/* Comments testing here */}
          {/* <div>
            <Comments />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default HomePage;
