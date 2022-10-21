import LoginFormPage from "./components/LoginFormPage";
import { Route, Switch } from "react-router-dom";
import Home from "./components/HomePage/index";
import Navigation from "./components/Navigation/index";
import ProfilePage from "./components/ProfileModal/ProfilePage";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Navigation />
        </Route>
        {/* <Route exact path="/">
          <Home />
        </Route> */}
        <Route exact path="/ProfilePage/:id">
          <ProfilePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
