import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateUser } from "../../store/user";
import "./DetailsModal.css";

function DetailsForm() {
  const dispatch = useDispatch();
  const [work, setWork] = useState("");
  const [highschool, setHighschool] = useState("");
  const [college, setCollege] = useState("");
  const [city, setCity] = useState("");
  const [hometown, setHometown] = useState("");
  const [relationship, setRelationship] = useState("");
  const [clicked, setClicked] = useState(false);
  const currentUser = useSelector(
    ({ entities: { users }, session: { currentUserId } }) =>
      users[currentUserId]
  );
  //   const details = [work, highschool, college, city, hometown, relationship];
  let user;
  const handleSubmit = (e) => {
    e.preventDefault();
    user = {
      ...currentUser,
      work,
      highschool,
      college,
      city,
      hometown,
      relationship,
    };
    dispatch(updateUser(user));
  };

  return (
    <>
      <form className="detailsform-modal" onSubmit={handleSubmit}>
        <div className="line-breakd"></div>
        <div className="details-modal">
          <div>
            <p id="edit-details">Edit details</p>
            <hr />
            <div className="your-intro">Customize your intro</div>
            <p id="will-not">Details you select will or will not be public</p>
          </div>
          <div style={{ height: 15 }}></div>
          <div className="details-containers">
            <div className="work-container">
              <div>Work</div>
              <div className="line-breakd"></div>
              <label className="work">
                <input
                  id="work"
                  type="text"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  placeholder="  Add a workplace"
                />
              </label>
            </div>
            <div className="line-breakd"></div>
            <div>HighSchool</div>
            <div className="line-breakd"></div>
            <div className="highschool">
              <label>
                <input
                  id="highschool"
                  type="text"
                  value={highschool}
                  onChange={(e) => setHighschool(e.target.value)}
                  placeholder="  Add high school"
                />
              </label>
            </div>
            <div className="line-breakd"></div>
            <div>College</div>
            <div className="line-breakd"></div>
            <div className="college">
              <label>
                <input
                  id="college"
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="  Add college"
                />
              </label>
            </div>

            <div className="line-breakd"></div>
            <div>City</div>
            <div className="line-breakd"></div>
            <div className="current-city-container">
              <label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="  Add current city"
                />
              </label>
            </div>
            <div className="line-breakd"></div>
            <div>Hometown</div>
            <div className="line-breakd"></div>
            <div className="hometown-container">
              <label>
                <input
                  type="text"
                  id="hometown"
                  value={hometown}
                  onChange={(e) => setHometown(e.target.value)}
                  placeholder="  Add hometown"
                />
              </label>
            </div>
            <div className="line-breakd"></div>
            <div>Relationship</div>
            <div className="line-breakd"></div>
            <div className="relationship-container">
              <label>
                <input
                  id="relationship"
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="  Single"
                />
              </label>
            </div>
          </div>
        </div>
        <hr />
        <div className="details-buttons">
          <button className="cancel-edit-details">Cancel</button>
          <div style={{ width: 15 }}></div>
          <button
            className="submit-edit-details"
            style={{ width: 90 }}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default DetailsForm;
