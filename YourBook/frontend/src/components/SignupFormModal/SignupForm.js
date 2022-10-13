import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupForm() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          firstName,
          lastName,
          email,
          password,
          birthday,
          gender,
        })
      ).catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <>
      <div className="signup-modal">
        <div>
          <p id="signup">Sign Up</p>
          <p id="signup-info">It's quick and easy.</p>
          <hr />
        </div>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
            {/* {JSON.stringify(errors)} */}
          </ul>
          <div className="line-break"></div>
          <div className="name-container">
            <label className="firstname">
              <input
                id="firstname"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="  First Name"
                required
              />
            </label>
            <div className="line-break1"></div>
            <label className="lastname">
              <input
                id="lastname"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="  Last Name"
                required
              />
            </label>
          </div>
          <div className="line-break"></div>
          <div className="email-container">
            <label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="  Mobile number or email"
                required
              />
            </label>
          </div>
          <div className="line-break"></div>
          <div className="password-container">
            <label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="  New Password"
                required
              />
            </label>
          </div>
          <div className="line-break"></div>
          <div className="confirm-pw-container">
            <label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="  Comfirm Password"
                required
              />
            </label>
          </div>
          <div className="line-break"></div>
          <div className="birthday">
            <label id="birthday">Birthday:</label>
          </div>
          <div className="birthday-container">
            <select id="month">
              <option value="month">Jan</option>
              <option value="month">Feb</option>
              <option value="month">Mar</option>
              <option value="month">Apr</option>
              <option value="month">May</option>
              <option value="month">Jun</option>
              <option value="month">Jul</option>
              <option value="month">Aug</option>
              <option value="month">Sep</option>
              <option value="month">Oct</option>
              <option value="month">Nov</option>
              <option value="month">Dec</option>
            </select>
            <div className="line-break2"></div>
            <select id="day">
              <option value="day">1</option>
              <option value="day">2</option>
              <option value="day">3</option>
              <option value="day">4</option>
              <option value="day">5</option>
              <option value="day">6</option>
              <option value="day">7</option>
              <option value="day">8</option>
              <option value="day">9</option>
              <option value="day">10</option>
              <option value="day">11</option>
              <option value="day">12</option>
              <option value="day">13</option>
              <option value="day">14</option>
              <option value="day">15</option>
              <option value="day">16</option>
              <option value="day">17</option>
              <option value="day">18</option>
              <option value="day">19</option>
              <option value="day">20</option>
              <option value="day">21</option>
              <option value="day">22</option>
              <option value="day">23</option>
              <option value="day">24</option>
              <option value="day">25</option>
              <option value="day">26</option>
              <option value="day">27</option>
              <option value="day">28</option>
              <option value="day">29</option>
              <option value="day">30</option>
              <option value="day">31</option>
            </select>
            <div className="line-break2"></div>
            <select id="year">
              <option value="year">2022</option>
              <option value="year">2021</option>
              <option value="year">2020</option>
              <option value="year">2019</option>
              <option value="year">2018</option>
              <option value="year">2017</option>
              <option value="year">2016</option>
              <option value="year">2015</option>
              <option value="year">2014</option>
              <option value="year">2013</option>
              <option value="year">2012</option>
              <option value="year">2011</option>
              <option value="year">2010</option>
              <option value="year">2009</option>
              <option value="year">2008</option>
              <option value="year">2007</option>
              <option value="year">2006</option>
              <option value="year">2005</option>
              <option value="year">2004</option>
              <option value="year">2003</option>
              <option value="year">2002</option>
              <option value="year">2001</option>
              <option value="year">2000</option>
              <option value="year">1999</option>
              <option value="year">1998</option>
              <option value="year">1997</option>
              <option value="year">1996</option>
              <option value="year">1995</option>
              <option value="year">1994</option>
              <option value="year">1993</option>
              <option value="year">1992</option>
              <option value="year">1991</option>
              <option value="year">1990</option>
              <option value="year">1989</option>
              <option value="year">1988</option>
              <option value="year">1987</option>
              <option value="year">1986</option>
              <option value="year">1985</option>
              <option value="year">1984</option>
              <option value="year">1983</option>
              <option value="year">1982</option>
              <option value="year">1981</option>
              <option value="year">1980</option>
            </select>
          </div>
          <div className="line-break"></div>
          <div className="gender">
            Gender
            <div className="gender-container">
              <div className="gender-container1">
                <label for="gender">Male</label>
                <input type="radio" value="male" id="male" name="gender" />
              </div>
              <div className="line-break2"></div>
              <div className="gender-container2">
                <label for="gender">Female</label>
                <input type="radio" value="female" id="female" name="gender" />
              </div>
              <div className="line-break2"></div>
              <div className="gender-container3">
                <label for="gender">Custom</label>
                <input type="radio" value="custom" id="custom" name="gender" />
              </div>
            </div>
          </div>
          <div className="line-break3"></div>
          <p>
            People who use our service may have uploaded your contact
            information to Facebook. Learn more.
          </p>
          <div className="line-break3"></div>
          <p>
            By clicking Sign Up, you agree to our Terms, Privacy Policy and
            Cookies Policy. You may receive SMS Notifications from us and can
            opt out any time.
          </p>
          <button className="submit-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupForm;
