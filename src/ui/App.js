import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import SearchPage from "./pages/search";
import ProfilePage from "./pages/profile";
import AdminPage from "./pages/admin";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>

        {/*should be using async routing or hooks?: <Route path="/search/accounting?category=1"> */}
        <Route path="/search">
          <SearchPage />
        </Route>

        {/*should be using async routing or hooks?: <Route path="/profile/:id"> */}
        <Route path="/profile">
          <ProfilePage />
        </Route>

        <Route path="/admin">
          <AdminPage />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
