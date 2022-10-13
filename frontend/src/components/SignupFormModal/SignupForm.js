import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupForm() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  let birthday;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      birthday = month + "/" + day + "/" + year;

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
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
          {/* {JSON.stringify(errors)} */}
        </ul>
        <div className="line-break"></div>
        <div className="signup-modal">
          <div>
            <p id="signup">Sign Up</p>
            <p id="signup-info">It's quick and easy.</p>
            <hr />
          </div>
          <div className="name-container">
            <label className="firstname">
              <input
                id="firstname"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="  First Name"
                style={
                  { firstName }.length === 0 ? { border: "1px solid red" } : {}
                }
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
                placeholder="  Confirm Password"
                required
              />
            </label>
          </div>
          <div className="line-break"></div>
          <div className="birthday">
            <label id="birthday">Birthday:</label>
          </div>
          <div className="birthday-container">
            <select id="month" onChange={(e) => setMonth(e.target.value)}>
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            <div className="line-break2"></div>
            <select id="day" onChange={(e) => setDay(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
            <div className="line-break2"></div>
            <select id="year" onChange={(e) => setYear(e.target.value)}>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
              <option value="2008">2008</option>
              <option value="2007">2007</option>
              <option value="2006">2006</option>
              <option value="2005">2005</option>
              <option value="2004">2004</option>
              <option value="2003">2003</option>
              <option value="2002">2002</option>
              <option value="2001">2001</option>
              <option value="2000">2000</option>
              <option value="1999">1999</option>
              <option value="1998">1998</option>
              <option value="1997">1997</option>
              <option value="1996">1996</option>
              <option value="1995">1995</option>
              <option value="1994">1994</option>
              <option value="1993">1993</option>
              <option value="1992">1992</option>
              <option value="1991">1991</option>
              <option value="1990">1990</option>
              <option value="1989">1989</option>
              <option value="1988">1988</option>
              <option value="1987">1987</option>
              <option value="1986">1986</option>
              <option value="1985">1985</option>
              <option value="1984">1984</option>
              <option value="1983">1983</option>
              <option value="1982">1982</option>
              <option value="1981">1981</option>
              <option value="1980">1980</option>
            </select>
          </div>
          <div className="line-break"></div>
          <div className="gender">
            Gender
            <div className="gender-container">
              <div className="gender-container1">
                <label htmlFor="gender">
                  {" "}
                  Male
                  <input
                    type="radio"
                    value="male"
                    id="male"
                    name="gender"
                    onChange={() => setGender("male")}
                  />
                </label>
              </div>
              <div className="line-break2"></div>
              <div className="gender-container2">
                <label htmlFor="gender">
                  {" "}
                  Female
                  <input
                    type="radio"
                    value="female"
                    id="female"
                    name="gender"
                    onChange={() => setGender("female")}
                  />
                </label>
              </div>
              <div className="line-break2"></div>
              <div className="gender-container3">
                <label htmlFor="gender">
                  Custom
                  <input
                    type="radio"
                    value="custom"
                    id="custom"
                    name="gender"
                    onClick={(e) => {
                      console.log("hi");
                      return (
                        <input
                          type="box"
                          value={gender}
                          id="custom"
                          onChange={(e) => setGender(e.target.value)}
                          placeholder="  Gender (optional)"
                        />
                      );
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <br />
          <div className="line-break3">
            <p>
              People who use our service may have uploaded your contact
              information to Facebook. Learn more.
            </p>
          </div>
          <div className="line-break3">
            <p>
              By clicking Sign Up, you agree to our Terms, Privacy Policy and
              Cookies Policy. You may receive SMS Notifications from us and can
              opt out any time.
            </p>
          </div>
        </div>
        <button className="submit-button" type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupForm;
