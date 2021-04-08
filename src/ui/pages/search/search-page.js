import React, {useState, useEffect, useReducer} from 'react';
import PageHeader from '../../components/header';
import PageTitleSearch from '../../components/page-title-search';
import SearchResults from '../../components/search-results';
import { useLocation } from 'react-router-dom';
import * as qs from 'query-string';
import search from '../../../services/search';
import Filter_modal from '../../components/filter_modal/filter_modal';
import '../../components/filter_modal/filter_modal.css';
import EventEmitter from '../../hooks/event-manager';
import storage from '../../../services/storage';
import { useHistory } from "react-router-dom";
import filters from "../../../services/filters";

let selection = [];
let selectionRaw = [];

const SearchPage = () => {
  let history = useHistory()
  const heading_text = 'Search Results';
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [selectionsRaw, setSelectionsRaw] = useState([]);
  const [selectionsData, setSelectionsData] = useState([]);
  
  useEffect(async () => {
    let query = qs.parse(location.search);
    if (query.q) {
      
      if (query.q == `{"meta":[]}`) {

        alert("Blank Search - You must select at least one filter or enter a keyword to search");
        window.history.back();
        return;
      }
      setSearchResults([]);
      let data = JSON.parse(decodeURIComponent(query.q));
      search.postSearchResults(null, data)
      .then(async(res) => {
        console.log(res);
        setSearchResults(res);
        await storage.ss.setPair('currentURI', encodeURIComponent(JSON.stringify(data)));
        return data;
      })
      .then(async (data) => {
        
      if(data.meta) {
        if(data.meta.length > 0) {
          let selectionRaw = data.meta;
          setSelectionsRaw(selectionRaw);
          EventEmitter.emit("updateChips", selectionRaw);
        } else {
          EventEmitter.emit("updateChips", []);
        }
      }
      });
    }
  }, [history.location.key]);

  // useEffect(async () => {
  //   let query = qs.parse(location.search);
    
  //   if (query.q) {
  //     setSearchResults([]);
  //     let data = JSON.parse(decodeURIComponent(query.q));
  //     search.postSearchResults(null, data)
  //     .then(async(res) => {
  //       //console.log(res);
  //       setSearchResults(res);
  //       await storage.ss.setPair('currentURI', encodeURIComponent(JSON.stringify(data)));
  //     });
  //   }
  // }, [history.location.key]);



  return (
    <div>
      <PageHeader data={selectionsRaw} />
      <PageTitleSearch data={ {title: heading_text} } />
      <SearchResults data={searchResults} />
    </div>
  );
};

export default SearchPage;
