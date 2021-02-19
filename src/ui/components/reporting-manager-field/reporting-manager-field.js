import React from "react";
import {Box, Grid, withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import EmployeeCard from '../profile-card/profile-card';
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
    reportingManagerBox: {
        // display: 'flex',
        height: 200,
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

const ReportingManagerField = ({bannerName}) => {
    const classes = useStyles();



    return (
        <Box className={classes.reportingManagerBox} >
            <div className={classes.title}>
                <HeaderTypography align={"left"} >Reporting Managers</HeaderTypography>
            </div>
            <div className={classes.content}>
                <EmployeeCard name={"First Last"} designation={"Designation"} officeLocation={"Location"} group={"Group"} />
                <EmployeeCard name={"First Last"} designation={"Designation"} officeLocation={"Location"} group={"Group"} />
            </div>
        </Box>
    );
}

export default ReportingManagerField