import React, { useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/landing-page';
import SearchPage from './pages/search';
import ProfilePage from './pages/profile';
import AdminPage from './pages/admin';
import filters from '../services/filters';

function App() {
  useEffect(async()=> {
    filters.init();


    /*const list = await filters.getFilterList();
    console.table(list);*/
  }, [] );

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>

        <Route path='/search'>
          <SearchPage />
        </Route>

        <Route path='/profile/:employeeNumber'>
          <ProfilePage />
        </Route>

        <Route path='/admin'>
          <AdminPage />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
