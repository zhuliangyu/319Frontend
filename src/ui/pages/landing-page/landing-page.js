import React from 'react';
import Header from './landing-header';
import PinnedProfiles from './pinned-profiles';
import ResumeSearch from './resume-search';
import ExploreAELocations from './explore-ae-locations';

const LandingPage = () => {

  return (
    <div>
      <Header />
      <PinnedProfiles />
      <ResumeSearch />
      <ExploreAELocations />
    </div>
  );

}

export default LandingPage;