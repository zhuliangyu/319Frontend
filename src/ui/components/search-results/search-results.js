import React, { useEffect, useState, useReducer } from 'react';
import './search-results.css';
import ProfileCard from '../profile-card';
import ProfileCardList from '../profile-card-list';
import storage from '../../../services/storage';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton, Grid, withStyles, Tooltip } from '@material-ui/core';
import LoadingIndicator from '../loading-indicator';

const ExpandButton = withStyles((theme) => ({
  root: {
    color: 'primary',
    backgroundColor: '#F8F9FA',
    boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.25)',
    // '&:hover': {
    //   backgroundColor: 'white',
    // },
  },
}))(IconButton);
let listed = 0;
let toShow = [];
const SearchResults = (props) => {
  // console.log(props.data.results);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(12);
  const [view, syncLocalStorageview] = useState(storage.ls.getPair('searchResultsView'));
  const [searchResults, setSearchResults] = useState(null);
  const [searchResultsDisplayed, setSearchResultsDisplayed] = useState([]);
  const [nextPageAvailable, setNextPageAvailable] = useState(false);

  const [showMore, setShowMore] = useState(false);
  // const forceUpdate = React.useReducer(bool => !bool)[1];
  
  useEffect(() => {
    setSearchResults(props.data.results);

    try {
      let reslen = props.data.results.length;
      if (reslen > 24) {
        toShow = props.data.results.slice(0, 24);
        listed = listed + 24;
        setShowMore(true);
      } else {
        toShow = props.data.results;
        setShowMore(false);
      }
      document.querySelector('.page-title-search').innerHTML = `${props.data.results.length} Search Result(s)`;
    } catch (e) {
      //continue;
    }
    setSearchResultsDisplayed(toShow);
    // forceUpdate();

  }, [props]);

  const checkNextPageAvailable = () => {
    if (searchResults.length <= searchResultsDisplayed.length) {
      setNextPageAvailable(false);
    }
  };

  // Control loading indicator
  useEffect(() => {
    if (searchResults !== null && searchResults !== undefined) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      document.querySelector('.page-title-search').innerHTML = `Searching...`;
    }
  }, [searchResults]);

  // Change viewing mode
  const changeViewFn = e => {
    syncLocalStorageview(storage.ls.getPair('searchResultsView'));
  };

  const handleExpandMore = () => {
    let reslen = props.data.results.length;
    if (reslen > (listed+24)) {
      toShow = toShow.concat(props.data.results.slice(listed, (listed+24)));
      listed += 24;
      setShowMore(true);
    } else {
      toShow = props.data.results;
      setShowMore(false);
    }

    setSearchResultsDisplayed(toShow);
    // forceUpdate();
  }

  useEffect(() => {
    window.addEventListener('storage', changeViewFn);
    return () => {
      window.removeEventListener('storage', changeViewFn);
    }
  }, []);

  if (isLoading) return (
    <div className='search-results-wrapper'>
      <LoadingIndicator />
    </div>
  );

  return (
    <div>
      <div className='search-results-wrapper'>
        <div className='search-results-container'>
          {searchResultsDisplayed !== undefined ? 
          (
          ((searchResultsDisplayed.length > 0) ? (
            searchResultsDisplayed.map(result => 
              (
                view === 'grid' ? 
                <ProfileCard key={searchResultsDisplayed.indexOf(result)} data={result} /> :
                <ProfileCardList key={searchResultsDisplayed.indexOf(result)} data={result} />
              )
              )
          ):(
            <center><b>{`👀 Looked here, there and everywhere - but couldn't find the person you're looking for.`}</b></center>
            //null
          ))
          ) : 
          (
            <center><b>{`💬 The Server and I aren't talking right now, try again later?`}</b></center>
            //null
          )
          }
        </div>
      </div>
      <Grid className='search-results-expand-more' container justify='center'
        style={{ display: nextPageAvailable ? 'flex' : 'none' }}
      > 
        {showMore ? (<Grid item>
          <Tooltip title={showMore ? 'Show more results' : 'All results already shown'} placement='right-end'>
            <ExpandButton onClick={handleExpandMore}>
              <ExpandMoreIcon color='primary' fontSize='large' />
            </ExpandButton>
          </Tooltip>
        </Grid>):(null)}
      </Grid>
    </div>
  );
};

export default SearchResults;
