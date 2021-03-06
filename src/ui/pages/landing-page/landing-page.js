import React, { useState, useEffect } from 'react';
import Header from './landing-header';
import PinnedProfiles from './pinned-profiles';
import ResumeSearch from './resume-search';
import ExploreAELocations from './explore-ae-locations';
import Filter_modal from '../../components/filter_modal/filter_modal';
import '../../components/filter_modal/filter_modal.css'
import filters from '../../../services/filters';
import storage from '../../../services/storage';
import { useLocation } from 'react-router-dom';
import EventEmitter from '../../hooks/event-manager';
const LandingPage = () => {

  const [pinnedProfiles, setPinnedProfiles] = useState([]);
  const [collegues, setCollegues] = useState([]);
  const [city, setCity] = useState('Vancouver');

  useEffect(async()=> {
    EventEmitter.addListener('onInit', async() => {
      filters.clear();
      document.querySelector("#searchInput").focus();
      setPinnedProfiles(await storage.db.searchDocument("pinnedProfiles", {status: "pinned"}));
      storage.ss.setPair('search_key', null);
      storage.ss.setPair('current_search', null);
      if (!storage.ls.getPair('searchHistory')) {
        storage.ls.setPair('searchHistory', JSON.stringify([]));
      }

      fetch("https://ipapi.co/city/", {"method": "GET"}).then(async(data) => {
        let result = await data.text();
        let locales = await storage.db.searchDocument("metadata", {call_name: "Location"});

        let filteredResult = locales.filter((locale) => {
          if (locale.value_name == result) return true;
          else return false;
        });

        let loc_id = 0;
        if (filteredResult.length != 0) {
          setCity(filteredResult[0].value_name);
          loc_id = filteredResult[0].value_id[0];

        } else {
          //alert(`Unknown Location "${result}", defaulting to "${locales[0].value_name}"`);
          setCity(locales[0].value_name);
          loc_id = locales[0].value_id[0];
        }

        let colleg = await fetch("/api/search/", {
          "method": "POST",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": `{"Location":{"type":"OR","values":[{"LocationId":"${loc_id}"}]}}`
        });

        let colleg_data = await colleg.json();
        colleg_data = colleg_data.results;
        setCollegues(colleg_data);
      });
    });
    

  }, [] );

  return (
    <div>
      <PinnedProfiles data={pinnedProfiles}/>
      <ResumeSearch />
      <ExploreAELocations data={{city: city, results: collegues}}/>
    </div>
  );

}

export default LandingPage;