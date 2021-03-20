// TODO: make the height of sub-header change to accomodate for filters overflow

import React, { useState, useEffect } from "react";
import "./sub-header.css";
import FilterIcon from "../../../../assets/filter-icon.svg";
import CloseIcon from "../../../../assets/close-icon.svg";
import { Button, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FilterChip from '../../filter-chip';
import filters from "../../../../services/filters";
import search from "../../../../services/search";
import storage from "../../../../services/storage";

const useStyles = makeStyles((theme) => ({
  button: {},
  buttonText: {
    paddingLeft: 10,
    textTransform: "none",
    fontWeight: 600,
    fontSize: 18,
  },
  divider: {
    height: 28,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 10,
    marginRight: 10,
  },
  chip: {
    fontSize: 14,
    color: "#ffffff",
    margin: 4,
    padding: 4,
  },
}));

const Subheader = (props) => {
  const classes = useStyles();
  const location = window.location.pathname;
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [searchState, syncStorageSearch] = useState(storage.ss.getPair('current_search'));

  const updateSearch = async (e) => {
    syncStorageSearch(storage.ss.getPair('current_search'));
  };

  useEffect(() => {
    window.addEventListener('update_search', updateSearch);
    return () => {
      window.removeEventListener('update_search', updateSearch);
    }
  }, []);

  useEffect(async () => {
    console.log('triggered chips_data update');
    if (searchState !== null) {
      const chips_data = await search.parseFilter(searchState);
      setSelectedFilters(chips_data);
    }
    // console.log('chips data ', chips_data);
  }, [searchState]);

  // TODO: needs to update filters on selected filters indexeddb
  const handleChipDelete = (uuid_to_delete) => {
    setSelectedFilters(selectedFilters.filter(chip => chip._uuid !== uuid_to_delete ));
  }

  return (
    <div>
      <div className="subheader-wrapper">
        {location.includes("search") ? (
          <>
            <Button className={classes.button} id="filter_open_button">
              <img width="24" height="24" src={FilterIcon}></img>
              <Typography className={classes.buttonText}>Filter</Typography>
            </Button>
            <Divider
              className={classes.divider}
              color="primary"
              orientation="vertical"
            />
            <div className="filter-chips">
              {
                selectedFilters.map(filter_data => 
                  <FilterChip key={filter_data._uuid} data={filter_data} handleDelete={() => handleChipDelete(filter_data._uuid)} />
                )
              }
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Subheader;
