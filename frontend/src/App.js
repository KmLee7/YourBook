// import LoginFormPage from "./components/LoginFormPage";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage/index";
import LoginPage from "./components/LoginPage/index";
// import ProfilePage from "./components/ProfileModal/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { currentUser } from "./store/session";
import ProfilePage from "./components/ProfilePage/ProfilePage";

function App() {
  const hasUser = useSelector((state) => !!state.session.currentUserId);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  console.log(hasUser, "has user!!!");
  console.log(useSelector((state) => state.session));
  // useEffect(() => {
  //   dispatch(currentUser).then(() => setLoad(true));
  // }, [dispatch]);
  return (
    <div>
      <>
        {!hasUser && (
          <Redirect to="/login">
            <LoginPage />
          </Redirect>
        )}
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/ProfilePage/:id" component={ProfilePage} />
        </Switch>
      </>
    </div>
  );
}

export default App;
