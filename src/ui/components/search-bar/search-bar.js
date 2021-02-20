import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  IconButton,
  CircularProgress,
  TextField,
  Card,
  CardContent,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import FilterIcon from "../../../assets/filter-icon.svg";
import { connect } from "react-redux";
import { performSearch } from "../../redux/actions/search-actions";

// const dummy_data = [
//   { value: 'project management', filter_name: 'skill' },
//   { value: 'vancouver', filter_name: 'physical location' },
//   { value: 'sales', filter_name: 'department' },
//   { value: 'ceo', filter_name: 'title' },
//   { value: 'accounting', filter_name: 'skill' },
//   { value: 'accounting', filter_name: 'department' },
// ];

const createUniqueOptions = createFilterOptions();

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  autocomplete: {
    width: 500,
    display: "flex",
  },
  text_field: {
    width: "100%",
    backgroundColor: "#EEF3F8",
  },
  divider: {
    height: 28,
    margin: 4,
  },
  card: {
    display: "flex",
    width: "100%",
  },
}));

const SearchBar = (props) => {
  const location = window.location.pathname;
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (event, newValue) => {
    // console.log('newValue: ', newValue);
    // // setValue(newValue);
    // console.log('event: ', event);

    // if (typeof newValue === 'string') {
    //   console.log('handleOnChange newValue is string');
    //   setValue({
    //     value: newValue,
    //   });
    // } else if (newValue && newValue.inputValue) {
    //   console.log('handleOnChange newValue && newValue.inputValue');
    //   // Create a new value from the user input
    //   setValue({
    //     value: newValue.inputValue,
    //   });
    // } else {
    //   console.log('handleOnChange else');
    //   setValue(newValue);
    // }
    setValue(newValue);

    console.log("handleOnChange newValue", newValue);
  };

  const handleInputChange = (event, newInputValue) => {
    // console.log('newInputValue: ', newInputValue);
    setInputValue(newInputValue);
  };

  const handleGetOptionLabel = (option) => {
    // Value selected with enter, right from the input
    if (typeof option === "string") {
      // console.log('getOptionLabel option is string');
      return option;
    }
    // Add 'xxx' option created dynamically
    if (option.inputValue) {
      // console.log('getOptionLabel is inputValue');
      return option.inputValue;
    }
    // Regular option
    // console.log('getOptionLabel regular');
    return option;
  };

  const handleInitiateSearch = () => {
    console.log("search button was clicked");
    // console.log(value);
    props.dispatch(performSearch(value));
  };

  const handleOpenFilterModal = () => {
    console.log("filter button was clicked");
  };

  const handleCreateNewOptions = (options, params) => {
    const filtered = createUniqueOptions(options, params);

    if (params.inputValue !== "") {
      if (params.inputValue.includes("@")) {
        filtered.push({
          inputValue: params.inputValue,
          filter_name: "Email",
        });
      } else if (/^[0-9-()\-]+$/i.test(params.inputValue)) {
        filtered.push(
          {
            inputValue: params.inputValue,
            filter_name: "Work Cell",
          },
          {
            inputValue: params.inputValue,
            filter_name: "Work Phone",
          }
        );
      } else {
        filtered.push({
          inputValue: params.inputValue,
          filter_name: "Name",
        });
        filtered.push({
          inputValue: params.inputValue,
          filter_name: "Email",
        });
      }
    }

    // console.log(filtered);

    return filtered;
  };

  return (
    <>
      <Autocomplete
        value={value}
        inputValue={inputValue}
        disableClearable
        freeSolo
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        filterSelectedOptions
        className={classes.autocomplete}
        id="async-search"
        renderOption={(option) => (
          <>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="body1">{option.inputValue}</Typography>
                <Typography variant="caption">{option.filter_name}</Typography>
              </CardContent>
            </Card>
          </>
        )}
        options={[]}
        onInputChange={(event, newValue) => {
          handleInputChange(event, newValue);
        }}
        onChange={(event, newValue) => {
          handleOnChange(event, newValue);
        }}
        filterOptions={(options, params) => {
          return handleCreateNewOptions(options, params);
        }}
        getOptionLabel={(option) => {
          return handleGetOptionLabel(option);
        }}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              variant="outlined"
              className={classes.text_field}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    <InputAdornment position="end">
                      {location.includes("search") ? null : (
                        <IconButton
                          type="button"
                          className={classes.iconButton}
                          onClick={handleOpenFilterModal}
                        >
                          <img width="24" height="24" src={FilterIcon}></img>
                        </IconButton>
                      )}
                      <IconButton
                        type="button"
                        className={classes.iconButton}
                        onClick={handleInitiateSearch}
                      >
                        <SearchIcon color="primary" />
                      </IconButton>
                    </InputAdornment>
                  </>
                ),
              }}
            />
          </>
        )}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    performSearch: (value) => dispatch(performSearch(value)),
  };
};

export default connect(mapDispatchToProps)(SearchBar);
