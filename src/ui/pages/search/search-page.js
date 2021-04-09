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
  
  // useEffect(async () => {
  //   doSearch();
  // }, []);

  useEffect(async() => {

    doSearch();
    await storage.ss.setPair('currentURI', null);
    window.scrollTo(0, 0);
  }, [location.search])

  const doSearch = async() => {
    let query = qs.parse(location.search);
    if (query.q) {
      
      /*if (query.q == `{"meta":[]}`) {

        alert("Blank Search - You must select at least one filter or enter a keyword to search");
        window.history.back();
        return;
      }*/
      setSearchResults([]);
      let data = JSON.parse(decodeURIComponent(query.q));
      if(data.Name) {
        await storage.ss.setPair('search_key', JSON.stringify({Name: data.Name}));
        // check if search name with spaces
        if (data.Name.values.length > 1) {
          await storage.ss.setPair('basisName', data.Name.values.toString().replace(',', ' '));
          await storage.ss.setPair('basisKeyName', JSON.stringify({key: 'Name', name: data.Name.values.toString().replace(',', ' ')}))
          document.getElementById('searchInput').value = data.Name.values.toString().replace(',', ' ');
        } else {
          await storage.ss.setPair('basisName', data.Name.values[0]);
          await storage.ss.setPair('basisKeyName', JSON.stringify({key: 'Name', name: data.Name.values[0]}))
          document.getElementById('searchInput').value = data.Name.values[0];  
        }
      } else if(data.Email) {
        await storage.ss.setPair('search_key', JSON.stringify({Email: data.Email}));
        await storage.ss.setPair('basisName', data.Email.values[0]);
        await storage.ss.setPair('basisKeyName', JSON.stringify({key: 'Email', name: data.Email.values[0]}))
        document.getElementById('searchInput').value = data.Email.values[0];
      } else if (data.WorkCell) {
        await storage.ss.setPair('search_key', JSON.stringify({WorkCell: data.WorkCell}));
        await storage.ss.setPair('basisName', data.WorkCell.values[0]);
        await storage.ss.setPair('basisKeyName', JSON.stringify({key: 'WorkCell', name: data.WorkCell.values[0]}))
        document.getElementById('searchInput').value = data.WorkCell.values[0];
      } else {
        await storage.ss.setPair('basisKeyName', JSON.stringify({key: null, name: null}))
        // await storage.ss.setPair('basisName', null);
      }
      search.postSearchResults(null, data)
      .then(async(res) => {
        //alert("!"+JSON.stringify(res));
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
  } 

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

  EventEmitter.addListener('deleteChip', (data) => {
    // console.log('deleteChip', data);
    setSelectionsRaw(data.selectionsRaw);
  })


  return (
    <div>
      <PageHeader data={selectionsRaw} />
      <PageTitleSearch data={ {title: heading_text} } />
      <SearchResults data={searchResults} />
    </div>
  );
};

export default SearchPage;
