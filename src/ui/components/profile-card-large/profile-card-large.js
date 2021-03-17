import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Avatar, Box, CardMedia, Divider, Grid, Icon, Link, withStyles} from "@material-ui/core";
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import TodayIcon from '@material-ui/icons/Today';
import WorkIcon from '@material-ui/icons/Work';
import profile from '../../../assets/profile.jpg';
import { useHistory } from "react-router-dom";
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
// main color scheme: primary (blue) & secondary (grey)
const PRIMARY = '#26415C'
const SECONDARY = '#C4C4C4'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
    },
    outerBox: {
        flex: '1 1 auto',
    },
    content: {
        alignItems: 'center',
        flexWrap: 'wrap',
        display: 'flex',
    },
    orgChartLink: {
        // alignItems: 'center',
        // flexWrap: 'wrap',
        // display: 'flex',
        float: 'right'
    },
    cardContent: {
        padding: 16,
        width: '100%'

    },
    profileDiv: {
        paddingLeft: 16
    },
    profilePic: {
        width: 150,
        height: 150
        // TODO: make height stay the same as width (aspect ration is messed up when window size shrinks)
    },
    icon: {
        color: '#26415C',
        fontFamily: 'Poppins',
        fontSize: 30,
        fontWeight: 400,
        display: 'inline-block',
        lineHeight: 300,
        align: 'left'
    },
    iconSmall: {
        color: '#26415C',
        fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: 400,
        display: 'inline-block',
        lineHeight: 12,
        align: 'left'
    }

}));

const HeaderTypography = withStyles({
    root: {
        color: "#26415C",
        fontWeight: 600,
        fontSize: 30,
        fontFamily: 'Poppins',
    }
})(Typography);

const SubheaderTypography = withStyles({
    root: {
        color: '#868D98',
        fontFamily: 'Poppins',
        fontSize: 24,
        fontWeight: 600,
    }
})(Typography);

const ParagraphTypography = withStyles({
    root: {
        color: '#868D98',
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: 400,
        align: "left"
    }
})(Typography);

const IconTypography = withStyles({
    root: {
        color: '#868D98',
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: 400,
        display: 'inline-block',
        lineHeight: 2.5,
        align: "left"
    }
})(Typography);

const ProfileCardLarge = (props) => {
    const classes = useStyles();
    let history = useHistory();
    return (
        <Box mt={3} mb={3}>
            <Card className={classes.root}>
                <Grid container spacing={0}>
                    <Grid container item xs={2} justify={"center"} alignItems="center" paddingRight={0}>
                        <div className={classes.profileDiv}>
                            <Avatar alt={props.data.firstName} src={profile} className={classes.profilePic} pr={0}/>
                        </div>
                    </Grid>
                    <Grid container item xs={5} justify={"flex-start"}>
                        <div className={classes.details}>
                            <CardContent>
                                <HeaderTypography align={"left"}>{props.data.firstName} {props.data.lastName}</HeaderTypography>
                                <SubheaderTypography align={"left"}>{props.data.title}</SubheaderTypography>
                                <SubheaderTypography align={"left"}>Group {props.data.groupCode} - Office {props.data.officeCode}</SubheaderTypography>
                                <ParagraphTypography align={"left"}>{"My 3 line description is Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eros libero, dignissim in lacus nec, tempor luctus mauris."}</ParagraphTypography>
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid container item xs={5} >
                        <div className={classes.cardContent}>
                            <div className={classes.outerBox}>
                                <div className={classes.content}>
                                    <PhoneIcon className={classes.icon} align={"left"}/>
                                    <IconTypography align={"left"}> {props.data.workCell} </IconTypography> <br/>
                                </div>
                                <div className={classes.content}>
                                    <EmailIcon className={classes.icon} align={"left"}/>
                                    <IconTypography align={"left"}> {props.data.email} </IconTypography><br/>
                                </div>
                                <div className={classes.content}>
                                    <TodayIcon className={classes.icon} align={"left"}/>
                                    <IconTypography align={"left"}> {props.data.hireDate} </IconTypography><br/>
                                </div>
                                <div className={classes.content}>
                                    <WorkIcon className={classes.icon} align={"left"}/>
                                    <IconTypography align={"left"}> {props.data.employmentType} </IconTypography><br/>
                                </div>
                                <div className={classes.orgChartLink}>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => {
                                            history.push(`/orgchart/${props.data.employeeNumber}`);
                                            window.location.reload();
                                        }}
                                    >
                                        View on Organization Chart →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}

export default ProfileCardLarge