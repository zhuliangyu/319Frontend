// TODO: make the height of sub-header change to accomodate for filters overflow

import React, { useState, useEffect } from "react";
import "./sub-header.css";
import FilterIcon from "../../../../assets/filter-icon.svg";
import CloseIcon from "../../../../assets/close-icon.svg";
import { Button, Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FilterChip from "../../filter-chip";
import filters from "../../../../services/filters";
import search from "../../../../services/search";
import storage from "../../../../services/storage";

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
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedFilterDocs, setSelectedFilterDocs] = useState([]);

    const [searchState, syncStorageSearch] = useState(
        storage.ss.getPair("current_search")
    );

    const updateSearch = async (e) => {
        syncStorageSearch(storage.ss.getPair("current_search"));
    };

    useEffect(() => {
        window.addEventListener("update_search", updateSearch);
        return () => {
            window.removeEventListener("update_search", updateSearch);
        };
    }, []);

    useEffect(async () => {
        const chips_data = await search.parseFilter(searchState);
        const chips_meta_ids = Array.from(chips_data, (d) => d.meta_id);
        setSelectedFilters(chips_data);
        setSelectedFilterDocs(chips_meta_ids);
    }, [searchState]);

    const handleChipDelete = async (uuid_to_delete) => {
        let newFilters = selectedFilters.filter(
            (chip) => chip._uuid !== uuid_to_delete
        );
        setSelectedFilters(newFilters);
        let docs = Array.from(newFilters, (d) => d.meta_id);
        setSelectedFilterDocs(docs);
        await filters.set(docs);
        document.getElementById("search_button_target").click();
    };

    return (
        <div>
            <div className="subheader-wrapper">
                {location.includes("search") ? (
                    <>
                        <Button
                            className={classes.button}
                            id="filter_open_button"
                        >
                            <img width="24" height="24" src={FilterIcon}></img>
                            <Typography className={classes.buttonText}>
                                Filter
                            </Typography>
                        </Button>
                        <Divider
                            className={classes.divider}
                            color="primary"
                            orientation="vertical"
                        />
                        <div className="filter-chips">
                            {selectedFilters.map((filter_data) => (
                                <FilterChip
                                    key={filter_data._uuid}
                                    data={filter_data}
                                    handleDelete={() =>
                                        handleChipDelete(filter_data._uuid)
                                    }
                                />
                            ))}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Subheader;
