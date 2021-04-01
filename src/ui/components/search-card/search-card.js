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

  const [keyword, setKeyword] = useState(props.data.keyword);
  const [filters, setFilters] = useState(props.data.filterObject);

  // console.log(data_to_display);

  // TODO: needs to apply filters as well
  const handleCardOnClick = async () => {
    console.log("search history card was clicked");
    console.log(qs.stringify(keyword));
    history.push(`/search?${qs.stringify(keyword)}`);
    // document.getElementById("search_button_target").click();
    // window.location.reload();
  };

  return (
    <Card className="profile-grid-card">
      <CardActions className="card-actions-wrapper" disableSpacing>
        <IconButton className="delete-button" onClick={props.deleteFn} size="small">
          <CloseIcon className="delete-button-icon" />
        </IconButton>
      </CardActions>

      <CardActionArea onClick={handleCardOnClick}>
        <div className="profile-details">
          <CardContent padding={0}>
            <Typography align={"left"}>
              Someone with the {Object.keys(keyword)[0]}{" "}
            </Typography>
            <Typography color="textSecondary">
                {keyword[Object.keys(keyword)[0]]}
              </Typography>
            {Object.keys(filters).length - 1 > 0 ? (
              <Typography variant="subtitle2" align={"left"}>
                and {Object.keys(filters).length - 1} other filter(s)
              </Typography>
            ) : null}
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default SearchCard;
