import React from "react";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chip: {
    fontSize: 14,
    color: "#ffffff",
    margin: 4,
    padding: 4,
  },
}));

const FilterChip = (props) => {
  const classes = useStyles();

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  return (
    <Chip
      color="secondary"
      className={classes.chip}
      size="small"
      label={props.label}
      onDelete={handleDelete}
    />
  );
};

export default FilterChip;
