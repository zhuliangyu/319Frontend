import React, { useEffect, useState } from "react";
import { Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import search from "../../../services/search";

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
  const [label, setLabel] = useState('');
  console.log(props);

  useEffect(() => {
    const parseFilterMetaId = async () => {
      let metaIdParsed = await search.parseFilterMetaId(props.data);
      console.log(metaIdParsed);
      let parsedLabel = metaIdParsed.display_name + " - " + metaIdParsed.value_name;
      setLabel(parsedLabel);
    }
    parseFilterMetaId();
  }, []);


  return (
    <Chip
      color="secondary"
      className={classes.chip}
      size="small"
      label={label}
      onDelete={props.handleDelete}
    />
  );
};

export default FilterChip;
