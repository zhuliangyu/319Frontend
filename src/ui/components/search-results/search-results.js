import React, { useEffect, useState } from 'react';
import './search-results.css';
import ProfileCard from '../profile-card';
import ProfileCardList from '../profile-card-list';
import storage from '../../../services/storage';

const SearchResults = (props) => {
  let searchResults = props.data;
  const [view, syncLocalStorageview] = useState(storage.ls.getPair('searchResultsView'));

  const changeViewFn = e => {
    syncLocalStorageview(storage.ls.getPair('searchResultsView'));
  };

  useEffect(() => {
    window.addEventListener('storage', changeViewFn);
    return () => {
      window.removeEventListener('storage', changeViewFn);
    }
  }, []);

  return (
    <div className='search-results-wrapper'>
      <div className='search-results-container'>
        {searchResults !== undefined ? 
        (
         ((searchResults.length > 0) ? (
          searchResults.map(result => 
            (
              view === 'card' ? 
              <ProfileCard key={searchResults.indexOf(result)} data={result} /> :
              <ProfileCardList key={searchResults.indexOf(result)} data={result} />
            )
            )
         ):(
          //<center><b>{`👀 We looked meticulously, but could find anyone maching your criteria in the directory.`}</b></center>
          null
         ))
        ) : 
        (
          <center><b>{`💬 The Server and I aren't talking right now, try again later?`}</b></center>
          //null
        )
        }
      </div>
    </div>
  );
};

export default SearchResults;
