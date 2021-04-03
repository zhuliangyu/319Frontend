import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/landing-page';
import SearchPage from './pages/search';
import ProfilePage from './pages/profile';
import AdminPage from './pages/admin';
import filters from '../services/filters';
import OrgChartPage from "./pages/org-chart";
import ContractorPage from "./pages/contractor";
import LoginPage from "./pages/login";
import ContractorEditPage from "./pages/contractor-edit";
import Header from './pages/landing-page/landing-header';

import EventEmitter from './hooks/event-manager';

function App() {
  useEffect(async()=> {
    await filters.init();
    EventEmitter.emit('onInit');
  }, [] );

  return (
    <div className='App'>
    <Header />
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>

        <Route path='/search'>
          <SearchPage />
        </Route>

        <Route path='/profile/:id' children={<ProfilePage />}>
          {/* <ProfilePage /> */}
        </Route>

        <Route path='/admin'>
          <AdminPage />
        </Route>

        <Route path='/contractor'>
          <ContractorPage />
        </Route>

        <Route path='/editcontractor/:id'>
          <ContractorEditPage />
        </Route>

        <Route path='/orgchart/:id' children={<OrgChartPage />}>
          {/* <OrgChartPage /> */}
        </Route>

        <Route path='/login'>
          <LoginPage />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
