import LoginFormPage from "./components/LoginFormPage";
import { Route, Switch } from "react-router-dom";
import Home from "./components/HomePage";
import Navigation from "./components/Navigation";
import ProfilePage from "./components/ProfileModal/ProfilePage";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Navigation />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/profilepage/:id">
          <ProfilePage />
        </Route>
      </Switch>
      {/* <Switch>
        <Route path="/login">
          <Navigation />
        </Route>
        <Route path="/signup">
          <Navigation />
        </Route>
      </Switch> */}
    </>
  );
}

export default App;
