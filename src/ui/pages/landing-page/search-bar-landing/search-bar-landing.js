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
import FilterListIcon from "@material-ui/icons/FilterList";
import { Autocomplete } from "@material-ui/lab";
import FilterIcon from "../../../../assets/filter-icon.svg";

const dummy_data = [
  { value: "project management", filter_name: "skill" },
  { value: "vancouver", filter_name: "physical location" },
  { value: "sales", filter_name: "department" },
  { value: "ceo", filter_name: "title" },
  { value: "accounting", filter_name: "skill" },
  { value: "accounting", filter_name: "department" },
];

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
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      // const response = await fetch('');
      // const data = await response.json();
      const data = dummy_data;

      if (active) {
        setOptions(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <Autocomplete
        className={classes.autocomplete}
        id="async-search"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        // getOptionSelected={(option, value) => option.value === value.value}
        getOptionLabel={(option) => option.value}
        renderOption={(option) => (
          <>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="body1">{option.value}</Typography>
                <Typography variant="caption">{option.filter_name}</Typography>
              </CardContent>
            </Card>
          </>
        )}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              placeholder="Search..."
              variant="outlined"
              className={classes.text_field}
              InputProps={{
                ...params.InputProps,
                // endAdornment: (
                //   <>
                //     {loading ? (
                //       <CircularProgress color="inherit" size={20} />
                //     ) : null}
                //     {/* {params.InputProps.endAdornment} */}

                // ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="button" className={classes.iconButton}>
                      <img width="24" height="24" src={FilterIcon}></img>
                    </IconButton>
                    <IconButton type="button" className={classes.iconButton}>
                      <SearchIcon color="primary" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}
      />
    </>
  );
};

export default SearchBar;
