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
  // console.log(props.filter_data);
  const filter_label = props.data.call_name + ' - ' + props.data.value_name;

  return (
    <Chip
      color="secondary"
      className={classes.chip}
      size="small"
      label={filter_label}
      onDelete={props.handleDelete}
    />
  );
};

export default FilterChip;
