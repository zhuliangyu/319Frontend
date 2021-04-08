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
    const [label, setLabel] = useState("");

    useEffect(() => {
        let tempLabel =
            props.data.details.display_name +
            " - " +
            props.data.details.value_name;
        setLabel(tempLabel);
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
