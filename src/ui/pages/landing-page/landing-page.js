import React, { useState, useEffect } from 'react';
import Header from './landing-header';
import PinnedProfiles from './pinned-profiles';
import ResumeSearch from './resume-search';
import ExploreAELocations from './explore-ae-locations';
import Filter_modal from '../../components/filter_modal/filter_modal';
import '../../components/filter_modal/filter_modal.css'
import filters from '../../../services/filters';
import storage from '../../../services/storage';
import { useHistory, useLocation } from 'react-router-dom';
import EventEmitter from '../../hooks/event-manager';


const LandingPage = () => {
  let history = useHistory();
  const [pinnedProfiles, setPinnedProfiles] = useState([]);
  const [collegues, setCollegues] = useState([]);
  const [city, setCity] = useState('Vancouver');

  useEffect(async()=> {
    EventEmitter.addListener('onInit', async() => {
      EventEmitter.emit('Loading');
      filters.clear();
      document.querySelector("#searchInput").focus();
      let locales = await storage.db.searchDocument("metadata", {call_name: "Location"});
      setPinnedProfiles(await storage.db.searchDocument("pinnedProfiles", {status: "pinned"}));
      storage.ss.setPair('search_key', null);
      storage.ss.setPair('basisName', null);
      storage.ss.setPair('basisKeyName', JSON.stringify({key: null, name: null}));
      storage.ss.setPair('current_search', null);
      if (!storage.ls.getPair('searchHistory')) {
        storage.ls.setPair('searchHistory', JSON.stringify([]));
      }
      setCollegues(await locs(locales));
    });
  
  }, [] );

  let count = 0;

  EventEmitter.addListener('triggerLoc', async() => {

    try{
      let locales = await storage.db.searchDocument("metadata", {call_name: "Location"});
      EventEmitter.emit('Loading');
      setCollegues(await locs(locales));
    } catch (e) {

    }
  })

  const locs = (locales) => {
    return new Promise(resolve => {
      fetch("https://ipapi.co/city", {"method": "GET"})
        .then(async(data) => {
          let result = await data.text();

          let filteredResult = locales.filter((locale) => {
            if (locale.value_name == result) return true;
            else return false;
          });

          let loc_id = 0;
          if (filteredResult.length != 0) {
            setCity(filteredResult[0].value_name);
            loc_id = filteredResult[0].value_id[0];

          } else {
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
          EventEmitter.emit('Loaded');
          resolve(colleg_data);
        })
        // handle unresolved promise
        // default to Burnaby
        .catch(async () => {
          let result = locales[0].value_name;

          let filteredResult = locales.filter((locale) => {
            if (locale.value_name == result) return true;
            else return false;
          });

          let loc_id = 0;
          if (filteredResult.length != 0) {
            setCity(filteredResult[0].value_name);
            loc_id = filteredResult[0].value_id[0];

          } else {
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
          EventEmitter.emit('Loaded');
          resolve(colleg_data);
        });
    });
  }

  return (
    <div>
      <PinnedProfiles data={pinnedProfiles}/>
      <ResumeSearch />
      <ExploreAELocations data={{city: city, results: collegues}}/>
    </div>
  );

}

export default LandingPage;