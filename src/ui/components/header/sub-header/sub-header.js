import React from "react";
import "./sub-header.css";
import FilterIcon from "../../../../assets/filter-icon.svg";
import CloseIcon from "../../../../assets/close-icon.svg";
import { Button, Chip, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <div>
      <div className="subheader-wrapper">
        {location.includes("search") ? (
          <>
            <Button className={classes.button}>
              <img width="24" height="24" src={FilterIcon}></img>
              <Typography className={classes.buttonText}>Filter</Typography>
            </Button>
            <Divider
              className={classes.divider}
              color="primary"
              orientation="vertical"
            />
            <div className="filter-chips">
              <Chip
                color="secondary"
                className={classes.chip}
                size="small"
                label="*dynamically generate label*"
                onDelete={handleDelete}
              />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Subheader;
