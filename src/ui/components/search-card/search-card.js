import React, { useState } from "react";
import {
  Grid,
  CardActionArea,
  Typography,
  CardContent,
  Card,
  IconButton,
  CardActions,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import "./search-card.css";
import * as qs from "query-string";

const SearchCard = (props) => {
  let history = useHistory();

  const data_to_display = JSON.stringify(props.data);

  const [uri, setURI] = useState(props.data.uri);
  //const [filters, setFilters] = useState(props.data.filterObject);

  // console.log(data_to_display);

  // TODO: needs to apply filters as well
  const handleCardOnClick = async () => {
    //console.log("search history card was clicked");
    //console.log(qs.stringify(keyword));
    history.push(`/search?q=${uri}`);
    // document.getElementById("search_button_target").click();
    // window.location.reload();
  };

  return (
    <Card className="profile-grid-card history-card">
      <CardActions className="card-actions-wrapper" disableSpacing>
        <IconButton className="delete-button" onClick={props.deleteFn} size="small">
          <CloseIcon className="delete-button-icon" />
        </IconButton>
      </CardActions>

      <CardActionArea onClick={handleCardOnClick}>
        <div className="profile-details history-card">
          <CardContent padding={0}>
            <Typography align={"left"}>
              {props.data.name}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default SearchCard;
