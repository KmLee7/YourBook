import LoginFormPage from "./components/LoginFormPage";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage/index";
import Navigation from "./components/Navigation/index";
import ProfilePage from "./components/ProfileModal/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { currentUser } from "./store/session";

function App() {
  const hasUser = useSelector((state) => !!state.session.currentUserId);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  console.log(hasUser, "has user!!!!!");
  // useEffect(() => {
  //   dispatch(currentUser).then(() => setLoad(true));
  // }, [dispatch]);
  return (
    <div>
      <>
        {!sessionStorage.getItem("currentUser") && (
          <Redirect to="/login">
            <Navigation />
          </Redirect>
        )}
        <Switch>
          <Route exact path="/login" component={Navigation} />
          <Route exact path="/" component={HomePage} />
          <Route exact path="/ProfilePage/:id" component={ProfilePage} />
        </Switch>
      </>
    </div>
    // <>
    //   {load && (
    //     <>
    //       {!hasUser && (
    //         <>
    //           <Redirect to="/login" />
    //         </>
    //       )}
    //       <Switch>
    //         <Route exact path="/login" component={Navigation} />
    //         <Route exact path="/" component={HomePage} />
    //         <Route exact path="/ProfilePage/:id" component={ProfilePage} />
    //       </Switch>
    //     </>
    //   )}
    // </>
  );
}

export default App;
