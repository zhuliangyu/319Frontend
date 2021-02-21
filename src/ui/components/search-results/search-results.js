import React from 'react';
import './search-results.css';
import ProfileCard from '../profile-card';

const SearchResults = (props) => {
  let searchResults = props.data;

  // console.log(searchResults);

  return (
    <div className='search-results-wrapper'>
      <div className='search-results-container'>
        {searchResults.length !== 0 ? 
        (
          searchResults.map(result => 
          <ProfileCard key={searchResults.indexOf(result)} data={result} />)
        ) : 
        (
          // <div style={{ paddingLeft: 20 }}>No results found</div>
          null
        )
        }
      </div>
    </div>
  );
};

export default SearchResults;
