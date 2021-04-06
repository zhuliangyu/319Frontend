import React, {useState, useEffect} from 'react';
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

const SearchPage = () => {
  let history = useHistory()
  const heading_text = 'Search Results';
  const location = useLocation();
  // const [queries, setQueries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  // const [loading, setLoading] = useState(true);

  /*useEffect(async () => {
    // console.log('running query string...');
    search.postSearchResults(qs.parse(location.search))
      .then(res => {
        // console.log(res);
        setSearchResults(res);
      })
  }, [location]);*/
  
  useEffect(async () => {
    let query = qs.parse(location.search);
    if (query.q) {
      setSearchResults([]);
      let data = JSON.parse(decodeURIComponent(query.q));
      search.postSearchResults(null, data)
      .then(res => {
        //console.log(res);
        setSearchResults(res);
      })
    }
  }, [history.location.key]);

  return (
    <div>
      <PageHeader />
      <PageTitleSearch data={{ title: heading_text }} />
      <SearchResults data={searchResults} />
    </div>
  );
};

export default SearchPage;
