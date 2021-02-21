import React from 'react';
import './search-results.css';
import ProfileCard from '../profile-card';

const SearchResults = (props) => {
  let searchResults = props.data;

  console.log(searchResults);

  return (
    <div className='search-results-wrapper'>
      <div className='search-results-container'>
        {searchResults.map(result => 
          <ProfileCard key={searchResults.indexOf(result)} data={result} />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
