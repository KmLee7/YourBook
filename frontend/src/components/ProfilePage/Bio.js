import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as userActions from "../../store/user";
import * as sessionActions from "../../store/session";

function Bio() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const users = useSelector((state) => state.entities.users);
  const history = useHistory();
  const [bioG, setBioG] = useState("");
  const [showBio, setShowBio] = useState(false);
  const currentUser = useSelector((state) => {
    return state.entities.users[id];
  });
  const currentUserId = useSelector((state) => state.session.currentUserId);
  const profilePageId = Number(
    history.location.pathname.split("/ProfilePage/")[1]
  );
  const profileOwner = useSelector(
    (state) => state.entities.users[profilePageId]
  );

  useEffect(() => {
    dispatch(userActions.getUser(profilePageId));
  }, [profilePageId]);

  const handleBioSave = (e) => {
    e.preventDefault();
    const updateUserInfo = {
      ...currentUser,
      bio: bioG,
    };
    dispatch(userActions.updateUser(updateUserInfo)).then(() => {
      setShowBio(false);
      setBioG("");
    });
  };

  return (
    <>
      <div>
        <div className="profilePageBio">
          {/* {profileOwner !== undefined &&
            profileOwner.bio !== undefined &&
            profileOwner.bio} */}
          {profileOwner?.bio && profileOwner.bio}
        </div>
        <div style={{ height: "20px" }}></div>
        {showBio && currentUser === profileOwner ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              style={{
                width: "287px",
                height: "50px",
                textAlign: "center",
                borderRadius: "8px",
                border: "1px solid lightgray",
                backgroundColor: "rgb(240, 242, 245)",
              }}
              placeholder="Describe who you are"
              type="text"
              value={bioG}
              onChange={(e) => setBioG(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "10px",
                marginTop: "10px",
              }}
            >
              <button className="bioCancel" onClick={() => setShowBio(false)}>
                Cancel
              </button>
              <button className="bioSave" onClick={handleBioSave}>
                Save
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {currentUserId === profilePageId ? (
              <button
                style={{
                  width: "290px",
                  height: "40px",
                  borderRadius: "8px",
                  border: "none",
                }}
                onClick={() => {
                  setShowBio(true);
                }}
              >
                {profileOwner !== undefined && profileOwner.bio !== undefined
                  ? "Edit Bio"
                  : "Add Bio"}
              </button>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Bio;
