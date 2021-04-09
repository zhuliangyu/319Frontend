import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  Avatar
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, useLocation } from "react-router-dom";
import * as qs from "query-string";
import storage from "../../../services/storage";
import "./search-bar.css";
import search from "../../../services/search";
import filters from "../../../services/filters";
import EventEmitter from "../../hooks/event-manager";

let resultMin = 1;
let resultMax = 1;

const SearchBar = (props) => {
  const location = useLocation();
  let history = useHistory();
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterDocs, setFilterDocs] = useState(null);
  const [profileDocs, setProfileDocs] = useState(null);
  const [filterOffset, setFilterOffset] = useState(2);
  const [profileOffset, setProfileOffset] = useState(null);

  useEffect(async()=> {
    document.getElementById('searchDeselect').style.setProperty("display", "none");
    let input = document.getElementById("searchInput");
    input.addEventListener("keyup", function(event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        document.getElementsByClassName('searchAuto-selected')[0].click();
        //  document.getElementById("search_button_target").click();
      }
      if (event.key == 'ArrowDown') {
        event.preventDefault();
        let exitId = document.querySelector('.searchAuto-selected').id;
        document.querySelector(`#${exitId}`).classList.remove("searchAuto-selected");
        let idx = exitId.split('-');
        idx = idx[2];
        idx++;
        if (idx > resultMax) {
          idx = resultMin;
        }
        document.querySelector(`#searchAuto-item-${idx}`).classList.add("searchAuto-selected");
      }

      if (event.key == 'ArrowUp') {
        event.preventDefault();
        let exitId = document.querySelector('.searchAuto-selected').id;
        document.querySelector(`#${exitId}`).classList.remove("searchAuto-selected");
        let idx = exitId.split('-');
        idx = idx[2];
        if (idx >= resultMin+1) {
          idx--;
        }
        document.querySelector(`#searchAuto-item-${idx}`).classList.add("searchAuto-selected");
      }

    });
  }, [] );

  // useEffect(() => {
  //   const currentPath = location.pathname;
  //   const searchParams = new URLSearchParams(location.search);
  // }, [location]);
  const getPlaceholder = () => {
    let choices = [
      "try searching for 'Susan'...",
      "try searching for 'acmes@acme.ca'...",
      "try searching for 'Victor'...",
      "Search here...",
      "try searching for 'Victoria'...",
      "Your brand new search expeirence is here :)",
      "Pro tip: use arrow keys to select autocomplete options!",
      "Pro tip: Press enter to do a blank search"
    ]
    let x = Math.round(Math.random() * (choices.length-1));
    const data = choices[x];
    return data;
  }
  const handleInputBlur = () => {
    document.getElementById('searchAuto').style.setProperty("display", "none");
    document.getElementById('searchDeselect').style.setProperty("display", "none");
  }

  const handleInputFocus = () => {
    document.getElementById('searchInput').removeAttribute('readonly');
    if (document.getElementById('searchInput').value != "") {
      document.getElementById('searchAuto').style.setProperty("display", "block");
      document.getElementById('searchDeselect').style.setProperty("display", "block");
    }
  }

  const handleOnChange = async(event, element) => {
    let exitId = document.querySelector('.searchAuto-selected').id;
    document.querySelector(`#${exitId}`).classList.remove("searchAuto-selected");
    document.querySelector(`#searchAuto-item-1`).classList.add("searchAuto-selected");
    let detectedFilter = search.detectType(element.value.trim())
    if(detectedFilter.toLowerCase() == 'workcell') {
      let number = element.value.trim();
      let neutral = ('' + number).replace(/\D/g, '');
      let components = neutral.match(/^(\d{3})(\d{3})(\d{4})$/);
      number = components[1] + '-' + components[2] + '-' + components[3];
      element.value = number;
    }
    setValue({inputValue: element.value.trim(), filter_name: detectedFilter, queryId: detectedFilter.toLowerCase()});
    if (element.value.trim() != "") {
      document.getElementById('searchAuto').style.setProperty("display", "block");
    } else {
      document.getElementById('searchAuto').style.setProperty("display", "none");
    }

    if (element.value.trim().length >= 3) {
      let allFilters = await storage.db.toArray('metadata');
      let allProfiles = await storage.db.toArray('viewHistory');

      let supplimentaryData = [];
      let buildManifest = [];
      for (let x of allFilters) {
        let val = `${x.call_name}_${x.value_name}`;
        if(!supplimentaryData.includes(val)) {
          supplimentaryData.push(val);
          buildManifest.push(x);
        } else {
          let meta_id = buildManifest[supplimentaryData.indexOf(val)].meta_id;
          meta_id = meta_id + `__${x.meta_id}`;
          buildManifest[supplimentaryData.indexOf(val)].meta_id = meta_id;
        }
      }

      allFilters = buildManifest;

      let filterResults = allFilters.filter((item) => {
        return item.value_name.toLowerCase().includes(element.value.trim().toLowerCase());
      });
      resultMax = filterOffset + filterResults.length -1;
      setProfileOffset(filterOffset + filterResults.length);
      setFilterDocs(filterResults);

      let profResults = allProfiles.filter((item) => {
        if (detectedFilter == "Email") {
          try {
            return item.email.toLowerCase().includes(element.value.trim().toLowerCase());
          } catch (e) {
            return false;
          }
        } else {
          return `${item.firstName} ${item.lastName}`.toLowerCase().includes(element.value.toLowerCase());
        }
      });
      if (profResults.length >= 6) {
        profResults = profResults.slice(0, 5);
      }
      resultMax += profResults.length;
      setProfileDocs(profResults);

    }

    // TODO: not accurate. needs to set the value filter, not the whole array
    setSelectedFilters([{inputValue: element.value.trim(), filter_name: detectedFilter, queryId: detectedFilter.toLowerCase()}]);

    // console.log("handleOnChange newValue", newValue);
  };

  const handleInitiateSearch = async(e, metadata = null, attach = null) => {
    handleInputBlur();
    let queries = await makeQueries();
    let raw = [metadata];
    if (metadata == null) {
      metadata = [];
      raw = [];
      try {
        if (queries[Object.keys(queries)[0]].values[0] != "") {
          await storage.ss.setPair('basisName', queries[Object.keys(queries)[0]].values[0]);
          // await storage.ss.setPair('basisKeyName', JSON.stringify({ key: Object.keys(queries)[0], name: queries[Object.keys(queries)[0]].values[0]}));
  
        } else {
          await storage.ss.setPair('basisName', null);
          alert('Blank Search - You must select at least one filter or enter a keyword to search');
          return;
        }
      } catch (error) {
        alert('Blank Search - You must select at least one filter or enter a keyword to search');
        return;
      }
      
    } else {
      if (document.getElementById('searchInput').value == "") {
        return;
      }
      metadata = metadata.split("__");
      document.querySelector('#searchInput').value = '';
      await storage.ss.setPair('search_key', null);
      await storage.ss.setPair('basisName', attach);
      // await storage.ss.setPair('basisKeyName', JSON.stringify({ key: Object.keys(queries)[0], name: queries[Object.keys(queries)[0]].values[0]}));

      queries = null;
    }
    let qstr = await filters.getQS(metadata, queries, raw);
    await storage.ss.setPair('basisURI', qstr);
    await storage.ss.setPair('currentURI', null);
    console.table(qstr);
    history.push(`/search?q=${qstr}`);
  };

  const makeQueries = async () => {
    let queries;

    for (let i = 0; i < selectedFilters.length; i++) {
      if (selectedFilters[i].filter_name === 'Name') {
        console.log('selectedFilters[i].filter_name', selectedFilters[i].filter_name);
        console.log('selectedFilters[i].inputValue', selectedFilters[i].inputValue);  
      }
      queries = {
        ...queries,
        [selectedFilters[i].filter_name]: {type:"OR",values:[selectedFilters[i].inputValue]},
      };
    }

    //ONLY FOR DEMO, REMOVE LATER
    if (selectedFilters.length > 0) {
      storage.ss.setPair('search_key', JSON.stringify(queries));
    } else {
      let resp = storage.ss.getPair('search_key');
      if (resp != undefined || resp != null) {
        queries = JSON.parse(resp);
      }
    }
    console.log(selectedFilters.length);
    return queries;
  }

  return (
    <section id="searchWrapper">
      <section id="searchBox">
        <input type="text" id="searchInput" autoComplete="off" placeholder={getPlaceholder()} readOnly onFocus={handleInputFocus} onChange={(event) => {handleOnChange(event, document.getElementById('searchInput'))}}/>
        <IconButton type="button" id="search_button_target" onClick={handleInitiateSearch}>
          <SearchIcon color="primary" />
        </IconButton>
      </section>
      <section id="searchAuto">
        <section className="searchAuto-item searchAuto-selected" id="searchAuto-item-1" onClick={handleInitiateSearch}>
          <p><i>Search for "{value.inputValue}" as {value.filter_name}</i></p>
        </section>

        {filterDocs !== null ? (filterDocs.map((filterDoc) => (
          <section className="searchAuto-item" key={`filter-${filterDocs.indexOf(filterDoc)}`} id={`searchAuto-item-${filterOffset + filterDocs.indexOf(filterDoc)}`} onClick={(event) => {handleInitiateSearch(event, filterDoc.meta_id, filterDoc.value_name)}}>
          <section className="searchAuto-wrapper">  
            <p>{filterDoc.value_name}</p>
            <span>{filterDoc.display_name}</span>
            </section>
          </section>
        ))) : (null)}
        
        {profileDocs !== null ? (profileDocs.map((profileDoc) => (
          <section className="searchAuto-item" key={`profile-${profileDocs.indexOf(profileDoc)}`} id={`searchAuto-item-${profileOffset + profileDocs.indexOf(profileDoc)}`} onClick={(event) => {window.location.assign(`/profile/${profileDoc.employeeNumber}`)}}>
            <Avatar alt={profileDoc.firstName} src={`/api/photos/${profileDoc.employeeNumber}`} className="searchAuto-profilePic" pr={0}/>
            <section className="searchAuto-wrapper">
              <p>{`${profileDoc.firstName} ${profileDoc.lastName}`}</p>
              <span>{profileDoc.title}</span>
            </section>
          </section>
        ))) : (null)}

      </section>
      <section id="searchDeselect" onClick={handleInputBlur}>
          
      </section>
    </section>
  );
};

export default SearchBar;
