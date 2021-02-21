import React, {useEffect, useState} from "react";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import ProfileCard from '../profile-card/profile-card';
import {getProfileResults} from "../../../services/profile";

const useStyles = makeStyles((theme) => ({
    reportingManagerBox: {
    },
    header: {
        color: "#26415C",
        fontWeight: 600,
        fontSize: 30,
        fontFamily: 'Poppins',
        flexDirection: 'row',
    },
    title: {
        padding: 16,
    }, content: {
        display: 'flex'
    }
}))

const ParagraphTypography = withStyles({
    root: {
        color: '#FFFFFF',
        fontFamily: 'Poppins',
        fontSize: 28,
        fontWeight: 600
    }
})(Typography);

const HeaderTypography = withStyles({
    root: {
        color: "#26415C",
        fontWeight: 600,
        fontSize: 30,
        fontFamily: 'Poppins',
    }
})(Typography);

const ReportingManagerField = (props) => {
    const classes = useStyles();

    const [profileResults, setProfileResults] = useState([]);

    useEffect(async () => {
        console.log("RUNNING useEFFECT IN ReportingManagerField");
        getProfileResults(2).then(res => {
            console.log(res);
            setProfileResults(res)
        })

    }, [])


    return (
        <div className={classes.reportingManagerBox} >
            <div className={classes.title}>
                <HeaderTypography align={"left"} >Reporting Managers</HeaderTypography>
            </div>
            <div className={classes.content}>
                <ProfileCard data={profileResults}  />
            </div>
        </div>
    );
}

export default ReportingManagerField