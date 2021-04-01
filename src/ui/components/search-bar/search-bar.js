import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  TextField,
  Card,
  CardContent,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { performSearch } from "../../redux/actions/search-actions";
import { useHistory, useLocation } from "react-router-dom";
import * as qs from "query-string";
import storage from "../../../services/storage";
import "./search-bar.css";
import search from "../../../services/search";
import filters from "../../../services/filters";

const SearchBar = (props) => {
  const location = useLocation();
  let history = useHistory();
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterDocs, setFilterDocs] = useState(null);

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
        document.querySelector(`#searchAuto-item-${idx}`).classList.add("searchAuto-selected");
      }

      if (event.key == 'ArrowUp') {
        event.preventDefault();
        let exitId = document.querySelector('.searchAuto-selected').id;
        document.querySelector(`#${exitId}`).classList.remove("searchAuto-selected");
        let idx = exitId.split('-');
        idx = idx[2];
        if (idx >= 2) {
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
    let detectedFilter = search.detectType(element.value)
    setValue({inputValue: element.value, filter_name: detectedFilter, queryId: detectedFilter.toLowerCase()});
    if (element.value != "") {
      document.getElementById('searchAuto').style.setProperty("display", "block");
    } else {
      document.getElementById('searchAuto').style.setProperty("display", "none");
    }

    if (element.value.length >= 3) {
      let allFilters = await storage.db.toArray('metadata');
      let results = allFilters.filter((item) => {
        return item.value_name.toLowerCase().includes(element.value.toLowerCase());
      });
      setFilterDocs(results);
    }

    // TODO: not accurate. needs to set the value filter, not the whole array
    setSelectedFilters([{inputValue: element.value, filter_name: detectedFilter, queryId: detectedFilter.toLowerCase()}]);

    // console.log("handleOnChange newValue", newValue);
  };

  const handleInitiateSearch = async(e, metadata = null) => {
    // console.log(value);
    handleInputBlur();
    let queries = await makeQueries();
    console.log(metadata)
    if (metadata != null) {
      await filters.set([metadata]);
      queries.name = "";
    }
    //{inputValue: "Name", filter_name: "Name", queryId: "name"}
    const stringified = qs.stringify(queries);

    history.push(`/search?${stringified}`);
    // window.dispatchEvent(new Event('update_search'));
    // props.dispatch(performSearch(value));
  };

  const makeQueries = async () => {
    let queries;

    for (let i = 0; i < selectedFilters.length; i++) {
      queries = {
        ...queries,
        [selectedFilters[i].queryId]: selectedFilters[i].inputValue,
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
        <input type="text" id="searchInput" autoComplete="off" readOnly onFocus={handleInputFocus} onChange={(event) => {handleOnChange(event, document.getElementById('searchInput'))}}/>
        <IconButton type="button" id="search_button_target" onClick={handleInitiateSearch}>
          <SearchIcon color="primary" />
        </IconButton>
      </section>
      <section id="searchAuto">
        <section className="searchAuto-item searchAuto-selected" id="searchAuto-item-1" onClick={handleInitiateSearch}>
          <p><i>Search for "{value.inputValue}" as {value.filter_name}</i></p>
        </section>

        {filterDocs !== null ? (filterDocs.map((filterDoc) => (
          <section className="searchAuto-item" key={`filter-${filterDocs.indexOf(filterDoc)}`} id={`searchAuto-item-${2 + filterDocs.indexOf(filterDoc)}`} onClick={(event) => {handleInitiateSearch(event, filterDoc.meta_id)}}>
            <p>{filterDoc.value_name}</p>
            <span>{filterDoc.display_name}</span>
          </section>
        ))) : (null)}

      </section>
      <section id="searchDeselect" onClick={handleInputBlur}>
          
      </section>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (value) => dispatch(performSearch(value)),
  };
};

export default connect(mapDispatchToProps)(SearchBar);
