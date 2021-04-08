import React, { useState, useEffect, useReducer } from "react";
import "./sub-header.css";
import FilterIcon from "../../../../assets/filter-icon.svg";
import CloseIcon from "../../../../assets/close-icon.svg";
import { Button, Divider, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FilterChip from "../../filter-chip";
import filtersService from "../../../../services/filters";
import search from "../../../../services/search";
import storage from "../../../../services/storage";
import EventEmitter from "../../../hooks/event-manager";
import { useHistory, useLocation } from "react-router-dom";

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
    let history = useHistory();
    const location = useLocation();

    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedMetaIds, setSelectedMetaIds] = useState([]);
    const [selectionsRaw, setSelectionsRaw] = useState([]);
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        const parse = async () => {
            let selectionRaw = [...props.selectionsRaw];
            let metaIds = [];

            // only push one meta id
            // check if it is has a double underscore, which means duplicate group
            for (let x of selectionRaw) {
                let splitFilterByUnderscore = x.split("__");
                let detail = await parseFilterMetaId(splitFilterByUnderscore[0]);
                let obj = { raw: x, metaIdNoDup: splitFilterByUnderscore[0], details: detail };
                metaIds.push(obj);
            }
            setFilters(metaIds);
            setSelectionsRaw(selectionRaw);
        }
        parse();

    }, []);

    const handleChipDelete = async (item) => {
        // let filter_to_delete;
        let newFilters;
        let selectionsRaw;
        let selectionNoDup;

        async function setNewData() {
            // make new filters
            newFilters = filters.filter((d) => d.raw !== item.raw);

            // make new raw filters (with __)
            selectionsRaw = Array.from(newFilters, (d) => d.raw);

            // make new selections (no __)
            selectionNoDup = Array.from(newFilters, d => d.metaIdNoDup);

        }
        setNewData();

        // update state
        setFilters(newFilters);
        setSelectionsRaw(selectionsRaw);
        
        // emit deleteChip event to filter modal
        // EventEmitter.emit("deleteChip", {
        //     newSelection: event_selection,
        // });
        let attach = await storage.ss.getPair('search_key');
        attach = JSON.parse(attach);

        let qstr = await filtersService.getQS(selectionNoDup, attach, selectionsRaw);
        await storage.ss.setPair('currentURI', null);
        history.push(`/search?q=${qstr}`);

    };

    // parse one filter meta id to get all details
    const parseFilterMetaId = async (metaId) => {
        let metaIdParsed = await search.parseFilterMetaId(metaId);
        return metaIdParsed;
    };

    // useEffect(() => {
    //     async function parse() {
    //         let filters = await parseAllRawFilters(selectedMetaIds);
    //         // console.log(filters);
    //         setSelectedFilters(filters);
    //     }
    //     parse();
    // }, [selectedMetaIds]);

    // Listener to update chips data
    //     // let selectionRaw = [...data];
    //     // let metaIds = [];

    //     // // only push one meta id
    //     // // check if it is has a double underscore, which means duplicate group
    //     // for (let x of selectionRaw) {
    //     //     let splitFilterByUnderscore = x.split("__");
    //     //     let obj = { raw: x, metaIdNoDup: splitFilterByUnderscore[0] };
    //     //     metaIds.push(obj);
    //     // }
    //     // setSelectedMetaIds(metaIds);
    //     console.log('data from filter-modal update chips', data);
    // });

    EventEmitter.once("updateChips", async (data) => {
        let selectionRaw;
        let metaIds;
        const parse = async () => {
            selectionRaw = [...data];
            metaIds = [];

            // only push one meta id
            // check if it is has a double underscore, which means duplicate group
            for (let x of selectionRaw) {
                let splitFilterByUnderscore = x.split("__");
                let detail = await parseFilterMetaId(splitFilterByUnderscore[0]);
                let obj = { raw: x, metaIdNoDup: splitFilterByUnderscore[0], details: detail };
                metaIds.push(obj);
            }
            setFilters(metaIds);
        }
        await parse();
        // // console.log(filters);
    })

    // // parse all filter metaids and create new objects to set selectedFilters
    // const parseAllRawFilters = async (data) => {
    //     let filtersToReturn = [];
    //     for (let x of data) {
    //         let temp = x;
    //         let obj = await parseFilterMetaId(x.metaIdNoDup);
    //         temp.details = obj;
    //         filtersToReturn.push(temp);
    //     }
    //     return filtersToReturn;
    // };

    return (
        <div>
            <div className="subheader-wrapper">
                <Button className={classes.button} id="filter_open_button">
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
                    {filters.map((d) => (
                        <FilterChip
                            key={d.metaIdNoDup}
                            data={d}
                            handleDelete={() => handleChipDelete(d)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Subheader;
