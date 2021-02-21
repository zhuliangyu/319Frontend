import React, {useState, useEffect} from 'react';
import PageHeader from '../../components/header';
import PageTitleSearch from '../../components/page-title-search';
import SearchResults from '../../components/search-results';
import { useLocation } from 'react-router-dom';
import * as qs from 'query-string';
import  { postSearchResults } from '../../../services/search';

const SearchPage = () => {
  const heading_text = 'Search Results';
  const location = useLocation();
  // const [queries, setQueries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log('running query string...');
    postSearchResults(qs.parse(location.search))
      .then(res => {
        // console.log(res);
        setSearchResults(res);
      })
  }, []);

  return (
    <div>
      <PageHeader />
      <PageTitleSearch data={{ title: heading_text }} />
      <SearchResults data={searchResults} />
    </div>
  );
};

export default SearchPage;
