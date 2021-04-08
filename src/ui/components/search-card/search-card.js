import React, { useState, useEffect } from "react";
import {
    CardActionArea,
    Typography,
    CardContent,
    Card,
    IconButton,
    CardActions,
    Popover,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import "./search-card.css";
import search from "../../../services/search";
import storage from "../../../services/storage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: "none",
    },
    paper: {
        padding: theme.spacing(1),
    },
}));  

const NoFilterCardDiv = (props) => {
    return (
        <div className="profile-details">
            <CardContent padding={0}>
                <Typography>
                    Someone with the
                    <b className="card-key"> {props.data.key} </b>
                    <b>"{props.data.value}"</b>
                </Typography>
            </CardContent>
        </div>
    );
};

const HasFilterCardDiv = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="profile-details">
            <CardContent padding={0}>
                <Typography>
                    Someone with the
                    <b className="card-key"> {props.data.keyName.key} </b>
                    <b>"{props.data.keyName.name}"</b>
                </Typography>
                {props.data.filters.length > 0 ? (
                    <Typography variant="subtitle2" align={"left"}>
                        with the filter:{" "}
                        {props.data.filters[0].details.call_name} -{" "}
                        {props.data.filters[0].details.value_name}
                    </Typography>
                ) : null}
                {props.data.filters.length - 1 > 0 ? (
                    <>
                        <Typography
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            variant="subtitle2"
                            align={"left"}
                        >
                            and {props.data.filters.length - 1} other filter(s)
                        </Typography>
                        <Popover
                            open={open}
                            className={classes.popover}
                            classes={{paper: classes.paper}}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            onClose={handlePopoverClose}
                        >
                            {props.data.filters
                                .slice(1, props.data.filters.length)
                                .map((filter) => (
                                    <Typography
                                        key={`${props.data.uid}-${filter.raw}`}
                                        variant="subtitle2"
                                    >
                                        {filter.details.call_name} -{" "}
                                        {filter.details.value_name}
                                    </Typography>
                                ))
                            }
                        </Popover>
                    </>
                ) : null}
            </CardContent>
        </div>
    );
};

const HasFilterCardNoBasisKeyNameDiv = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div className="profile-details">
            <CardContent padding={0}>
                <Typography>
                    Someone with the filter
                </Typography>
                {props.data.filters.length > 0 ? (
                    <Typography>
                        <b className="card-key">
                            {props.data.filters[0].details.call_name} -{" "}
                            {props.data.filters[0].details.value_name}
                        </b>                        
                    </Typography>
                ) : null}
                {props.data.filters.length - 1 > 0 ? (
                    <>
                        <Typography
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            variant="subtitle2"
                            align={"left"}
                        >
                            and {props.data.filters.length - 1} other filter(s)
                        </Typography>
                        <Popover
                            open={open}
                            className={classes.popover}
                            classes={{paper: classes.paper}}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            onClose={handlePopoverClose}
                        >
                            {props.data.filters
                                .slice(1, props.data.filters.length)
                                .map((filter) => (
                                    <Typography
                                        key={`${props.data.uid}-${filter.raw}`}
                                        variant="subtitle2"
                                    >
                                        {filter.details.call_name} -{" "}
                                        {filter.details.value_name}
                                    </Typography>
                                ))
                            }
                        </Popover>
                    </>
                ) : null}
            </CardContent>
        </div>
    );
};

const SearchCard = (props) => {
    let history = useHistory();

    const [uri, setURI] = useState(props.data.uri);
    const [decodedUri, setDecodedUri] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function parseUri() {
            let decodedURI = JSON.parse(decodeURIComponent(uri));
            setDecodedUri(decodedURI);
            if (decodedURI.meta) {
                let allData;

                // if there are filters
                if (decodedURI.meta.length > 0) {
                    let selectionRaw = decodedURI.meta;
                    let filtersData = [];
                    // only push one meta id
                    // check if it is has a double underscore, which means duplicate group
                    for (let x of selectionRaw) {
                        let splitFilterByUnderscore = x.split("__");
                        let detail = await parseFilterMetaId(
                            splitFilterByUnderscore[0]
                        );
                        let filterData = {
                            raw: x,
                            metaIdNoDup: splitFilterByUnderscore[0],
                            details: detail,
                        };
                        filtersData.push(filterData);
                    }
                    let obj = {
                        hasFilters: true,
                        hasName: props.data.name !== 'null',
                        filters: filtersData,
                        name: props.data.name,
                        keyName: JSON.parse(props.data.basisKeyName),
                    };
                    allData = obj;

                    // if there are no filters
                } else {
                    let keys = Object.keys(decodedURI).filter(
                        (d) => d !== "meta"
                    );
                    for (let key of keys) {
                        let value = decodedURI[key].values[0];
                        let obj = { hasFilters: false, key: key, value: value };
                        allData = obj;
                    }
                }
                // set data state
                setData(allData);
            }
        }

        parseUri();
        setURI(props.data.uri);
    }, [props.data]);

    // parse one filter meta id to get all details
    const parseFilterMetaId = async (metaId) => {
        let metaIdParsed = await search.parseFilterMetaId(metaId);
        return metaIdParsed;
    };

    // Handle card click
    // Starts a search based on uri
    const handleCardOnClick = async () => {
        await storage.ss.setPair("currentURI", null);
        history.push(`/search?q=${uri}`);
    };

    return (
        <Card className="profile-grid-card" >
            <CardActions className="card-actions-wrapper" disableSpacing>
                <IconButton
                    className="delete-button"
                    onClick={props.deleteFn}
                    size="small"
                >
                    <CloseIcon className="delete-button-icon" />
                </IconButton>
            </CardActions>

            <CardActionArea onClick={handleCardOnClick}>
                {data.hasFilters ? (
                    data.hasName ? (
                        <HasFilterCardDiv data={data} />
                    ) : (
                        <HasFilterCardNoBasisKeyNameDiv data={data} />
                    )
                ) : (
                    <NoFilterCardDiv data={data} />
                )}
            </CardActionArea>
        </Card>
    );
};

export default SearchCard;
