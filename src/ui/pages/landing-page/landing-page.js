import React from 'react';
import Header from './landing-header';
import PinnedProfiles from './pinned-profiles';
import ResumeSearch from './resume-search';
import ExploreAELocations from './explore-ae-locations';
import Filter_modal from '../../components/filter_modal/filter_modal';
import '../../components/filter_modal/filter_modal.css'

const LandingPage = () => {

  return (
    <div>
      <Header />
      <PinnedProfiles />
      <ResumeSearch />
      <ExploreAELocations />
      <Filter_modal/>
    </div>
  );

}

export default LandingPage;