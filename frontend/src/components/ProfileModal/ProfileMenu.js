import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "./ProfileModal.css";

function ProfileMenu() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="profile-menu-container">
        <div className="user-profile">
          {/* <button>
            <FaUserCircle className="user-logo" size={50} color="black" />
          </button> */}
        </div>
        <div className="user-logout">
          <button
            onClick={() => {
              dispatch(logout());
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileMenu;
