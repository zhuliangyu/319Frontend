import React, { useState, useEffect } from "react";
import "./sub-header.css";
import FilterIcon from "../../../../assets/filter-icon.svg";
import CloseIcon from "../../../../assets/close-icon.svg";
import { Button, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FilterChip from '../../filter-chip';
import filters from "../../../../services/filters";
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
  const [selectedFilters, setSelectedFilters] = useState(null);

  const [searchState, syncStorageSearch] = useState(sessionStorage.getItem('current_search'));

  const updateSearch = async (e) => {
    syncStorageSearch(sessionStorage.getItem('current_search'));
    // console.log('--', await storage.db.searchDocument("metadata", {meta_id: "Office,01,02"}));
    console.log(JSON.parse(sessionStorage.getItem('current_search')));
  };

  useEffect(() => {
    window.addEventListener('update_search', updateSearch);
    return () => {
      window.removeEventListener('update_search', updateSearch);
    }
  }, []);

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  // useEffect(() => {
  //   console.log(filters.get());
  //   console.log('--', await storage.db.searchDocument("metadata", {meta_id: "Office,01,02"}));

  // }, []);

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
              
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Subheader;
