import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import SearchPage from "./pages/search";
import ProfilePage from "./pages/profile";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>

        <Route path="/search">
          <SearchPage />
        </Route>

        <Route path="/profile/:id">
          <ProfilePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
