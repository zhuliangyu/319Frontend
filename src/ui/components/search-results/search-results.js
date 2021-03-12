import React from 'react';
import './search-results.css';
import ProfileCard from '../profile-card';

const SearchResults = (props) => {
  let searchResults = props.data;

  // console.log(searchResults);

  return (
    <div className='search-results-wrapper'>
      <div className='search-results-container'>
        {searchResults !== undefined ? 
        (
         ((searchResults.length > 0) ? (
          searchResults.map(result => 
            <ProfileCard key={searchResults.indexOf(result)} data={result} />)
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
