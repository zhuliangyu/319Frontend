import React, {useState, useEffect} from 'react';
import PageHeader from '../../components/header';
import PageTitleSearch from '../../components/page-title-search';
import SearchResults from '../../components/search-results';
import { useLocation } from 'react-router-dom';
import * as qs from 'query-string';
import  { postSearchResults } from '../../../services/search';
import Filter_modal from '../../components/filter_modal/filter_modal';
import '../../components/filter_modal/filter_modal.css';
import filters from '../../../services/filters';
import storage from '../../../services/storage';
import search from '../../../services/search';

const SearchPage = () => {
  const heading_text = 'Search Results';
  const location = useLocation();
  // const [queries, setQueries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(async () => {
    // console.log('running query string...');
    search.postSearchResults(qs.parse(location.search))
      .then(res => {
        // console.log(res);
        setSearchResults(res);
      })
  }, [location]);

  return (
    <div>
      <PageHeader />
      <PageTitleSearch data={{ title: heading_text }} />
      <SearchResults data={searchResults} />
      <Filter_modal/>
    </div>
  );
};

export default SearchPage;
