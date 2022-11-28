import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./RightProfile.css";

function RightProfile() {
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );

  let userName;
  if (currentUser) {
    userName = currentUser.first_name + " " + currentUser.last_name;
  }

  return (
    <>
      <form className="right-side-profile-modal">
        <div>
          <FaUserCircle className="user-logo1" size={50} color="black" />
          <div style={{ width: "15" }}></div>
        </div>
        <div className="user-username1">
          {currentUser && currentUser.first_name + " " + currentUser.last_name}
        </div>
        <div>Heyy</div>
        <div>
          HOw u Doingadsfadsfd afsadf asd f asd f sadf adsfadsf adsfadsfas adf
          setDayfd sdf
        </div>
      </form>
    </>
  );
}

export default RightProfile;
