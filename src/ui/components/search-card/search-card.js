import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  CardActionArea,
  Typography,
  CardContent,
  Card,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./search-card.css";
import * as qs from "query-string";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    width: 280,
    marginRight: 16,
    marginBottom: 10,
  },
  details: {
    display: "flex",
    flexDirection: "row",
  },
  outerBox: {
    flex: "1 1 auto",
  },
  content: {
    alignItems: "center",
    flexWrap: "wrap",
    display: "flex",
  },
  cardContent: {
    padding: 16,
  },
}));

const SearchCard = (props) => {
  const classes = useStyles();
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
    <Card className={classes.root}>
      <CardActionArea onClick={handleCardOnClick}>
        <div className={classes.details}>
          <CardContent padding={0}>
            <Typography align={"left"}>
              Someone with the {Object.keys(keyword)[0]}{" "}
              <Typography color="textSecondary">{keyword[Object.keys(keyword)[0]]}</Typography>
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
