import React, { useState, useEffect } from "react";
import "./sub-header.css";
import FilterIcon from "../../../../assets/filter-icon.svg";
import CloseIcon from "../../../../assets/close-icon.svg";
import { Button, Divider, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FilterChip from "../../filter-chip";
import filters from "../../../../services/filters";
import search from "../../../../services/search";
import storage from "../../../../services/storage";
import EventEmitter from "../../../hooks/event-manager";

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
    const [selectedFilterDocs, setSelectedFilterDocs] = useState([]);
    
    const [searchState, syncStorageSearch] = useState(
        storage.ss.getPair("currentURI")
    );

    // const updateSearch = async (e) => {
    //     syncStorageSearch(storage.ss.getPair("currentURI"));
    // };

    // useEffect(() => {
    //     window.addEventListener("update_search", updateSearch);
    //     return () => {
    //         window.removeEventListener("update_search", updateSearch);
    //     };
    // }, []);

    useEffect(() => {
        // console.log('selectedFilterDocs', selectedFilterDocs);
    }, [selectedFilterDocs]);

    const handleChipDelete = async (uuid_to_delete) => {
        // let newFilters = selectedFilters.filter(
        //     (chip) => chip._uuid !== uuid_to_delete
        // );
        // setSelectedFilters(newFilters);
        // let docs = Array.from(newFilters, (d) => d.meta_id);
        // setSelectedFilterDocs(docs);
        // console.log(docs);
        // console.log(newFilters);
        // await filters.set(docs);
        console.log('clicked chip delete');
    };


    // Listener to update chips data
    EventEmitter.addListener('updateChips', (data) => {
        let filtersRaw = [...data];
        let filters = [];

        // only push one meta id
        // check if it is has a double underscore, which means duplicate group
        for (let x of filtersRaw) {
            let splitFilterByUnderscore = x.split("__");
            filters.push(splitFilterByUnderscore[0]);
        }

        setSelectedFilterDocs(filters);
    });

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
                            {selectedFilterDocs.map((filter_data) => (
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
