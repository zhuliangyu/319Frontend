import React, { useState, useEffect } from "react";
import {
  CardActionArea,
  Typography,
  CardContent,
  Card,
  IconButton,
  CardActions,
  Popover,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import "./search-card.css";
import * as qs from "query-string";
import search from "../../../services/search";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

const SearchCard = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let keyword = props.data.keyword;
  let filters = props.data.filterObject;
  let id = props.id;

  const [parsedFilters, setParsedFilters] = useState([]);
  const [filterDocs, setFilterDocs] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    async function parseFilter() {
      const filters_data = await search.parseFilter(JSON.stringify(props.data));
      const filters_meta_ids = Array.from(filters_data, (d) => d.meta_id);
      setParsedFilters(filters_data);
      setFilterDocs(filters_meta_ids);
    }
    parseFilter();
  }, [props.data]);

  // TODO: needs to apply filters as well
  const handleCardOnClick = async () => {
    console.log("search history card was clicked");
    console.log(qs.stringify(keyword));
    history.push(`/search?${qs.stringify(keyword)}`);
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  if (!keyword) {
    return <> </>;
  }

  // search by filter objects (not query string, so no keyword object was passed)
  if (
    Object.keys(keyword)[0] === "name" &&
    keyword[Object.keys(keyword)[0]] === ""
  ) {
    return (
      <Card className="profile-grid-card">
        <CardActions className="card-actions-wrapper" disableSpacing>
          <IconButton
            className="delete-button"
            onClick={props.deleteFn}
            size="small"
          >
            <CloseIcon className="delete-button-icon" />
          </IconButton>
        </CardActions>

        <CardActionArea onClick={handleCardOnClick}>
          <div className="profile-details">
            <CardContent padding={0}>
              <Typography>Someone...</Typography>
              {parsedFilters.length > 0 ? (
                <Typography variant="subtitle2" align={"left"}>
                  with the filter: {parsedFilters[0].call_name} -{" "}
                  {parsedFilters[0].value_name}{" "}
                </Typography>
              ) : null}
              {parsedFilters.length - 1 > 0 ? (
              <>
                <Typography
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  variant="subtitle2"
                  align={"left"}
                >
                  and {parsedFilters.length - 1} other filter(s)
                </Typography>
                <Popover
                  open={open}
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                >
                  {
                    parsedFilters.slice(1, parsedFilters.length).map((filter) => (
                      <Typography key={`${id}-${parsedFilters.indexOf(filter)}`} variant="subtitle2">
                        {filter.call_name} - {filter.value_name}
                      </Typography>
                    ))
                  }
                </Popover>
              </>
            ) : null}
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card className="profile-grid-card">
      <CardActions className="card-actions-wrapper" disableSpacing>
        <IconButton
          className="delete-button"
          onClick={props.deleteFn}
          size="small"
        >
          <CloseIcon className="delete-button-icon" />
        </IconButton>
      </CardActions>

      <CardActionArea onClick={handleCardOnClick}>
        <div className="profile-details">
          <CardContent padding={0}>
            <Typography>
              Someone with the {Object.keys(keyword)[0]}{" "}
              <b>{keyword[Object.keys(keyword)[0]]}</b>
            </Typography>
            {parsedFilters.length > 0 ? (
              <Typography variant="subtitle2" align={"left"}>
                with the filter: {parsedFilters[0].call_name} -{" "}
                {parsedFilters[0].value_name}{" "}
              </Typography>
            ) : null}
            {parsedFilters.length - 1 > 0 ? (
              <>
                <Typography
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  variant="subtitle2"
                  align={"left"}
                >
                  and {parsedFilters.length - 1} other filter(s)
                </Typography>
                <Popover
                  open={open}
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handlePopoverClose}
                >
                  {
                    parsedFilters.slice(1, parsedFilters.length).map((filter) => (
                      <Typography key={`${id}-${parsedFilters.indexOf(filter)}`} variant="subtitle2">
                        {filter.call_name} - {filter.value_name}
                      </Typography>
                    ))
                  }
                </Popover>
              </>
            ) : null}
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default SearchCard;
