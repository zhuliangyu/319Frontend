import React, { useEffect, useState } from 'react';
import './search-results.css';
import ProfileCard from '../profile-card';
import ProfileCardList from '../profile-card-list';
import storage from '../../../services/storage';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { IconButton, Grid, withStyles, Tooltip } from '@material-ui/core';

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

const SearchResults = (props) => {
  // console.log(props.data.results);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [view, syncLocalStorageview] = useState(storage.ls.getPair('searchResultsView'));
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsDisplayed, setSearchResultsDisplayed] = useState([]);
  const [nextPageAvailable, setNextPageAvailable] = useState(false);

  useEffect(() => {
    console.log('trying to init data');
    console.log(props.data.total > perPage);
    console.log(props.data.results);
    setSearchResults(props.data.results);
    setNextPageAvailable(props.data.total > perPage);
  }, [props]);

  useEffect(() => {
    const checkNextPage = async () => {
      if (nextPageAvailable) {
        let newData = searchResults.slice(offset, offset + perPage);
        setSearchResultsDisplayed([...newData]);
        console.log('search next page available');
      } else {
        console.log('search next page not available');
        setSearchResultsDisplayed(searchResults);
      }
  
    }
    checkNextPage();
    // if (nextPageAvailable) {
    //   let newData = searchResults.slice(offset, offset + perPage);
    //   setSearchResultsDisplayed(searchResultsDisplayed => [...newData]);
    //   console.log('search next page available');
    // } else {
    //   console.log('search next page not available');
    //   setSearchResultsDisplayed(searchResults);
    // }
  }, [searchResults]);

  const checkNextPageAvailable = () => {
    if (searchResults.length === searchResultsDisplayed.length) {
      setNextPageAvailable(false);
    }
  };

  const changeViewFn = e => {
    syncLocalStorageview(storage.ls.getPair('searchResultsView'));
  };

  const handleExpandMore = () => {
    console.log('clicked expand more');
    let newOffset = offset + perPage;
    let newData = searchResults.slice(newOffset, newOffset + perPage);

    setOffset(newOffset);
    // console.log([ ...searchResultsDisplayed, ...newData]);
    setSearchResultsDisplayed(searchResultsDisplayed => [ ...searchResultsDisplayed, ...newData]);
    checkNextPageAvailable();
    // console.log('offset', newOffset);
    // console.log('new data', newData);
  }

  useEffect(() => {
    window.addEventListener('storage', changeViewFn);
    return () => {
      window.removeEventListener('storage', changeViewFn);
    }
  }, []);

  return (
    <div>
      <div className='search-results-wrapper'>
        <div className='search-results-container'>
          {searchResultsDisplayed !== undefined ? 
          (
          ((searchResultsDisplayed.length > 0) ? (
            searchResultsDisplayed.map(result => 
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
      <Grid className='search-results-expand-more' container justify='center'> 
        <Grid item>
          <Tooltip title={nextPageAvailable ? 'Show more results' : 'All results already shown'} placement='right-end'>
            <ExpandButton onClick={handleExpandMore}>
              <ExpandMoreIcon color='primary' fontSize='large' />
            </ExpandButton>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
};

export default SearchResults;
