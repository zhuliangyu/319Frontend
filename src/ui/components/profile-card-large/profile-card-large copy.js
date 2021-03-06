import React, {useEffect} from 'react';
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
import './profile-card-large.css';
import storage from '../../../services/storage';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: 234
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
    },

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
    let email = props.data.email
    let emailLink= "mailto:" + email
    const [isPinned, setIsPinned] = React.useState("Pin");

    useEffect(async() => {
        let allPins = await storage.db.toArray('pinnedProfiles');

        let results = allPins.filter((item) => {
            
            if (item.employeeNumber == props.data.employeeNumber) {
                setIsPinned("Unpin");
                return true;
            } else {
                return false;
            }
        });
        if (results.length > 0) {
            setIsPinned("Unpin");
        }
    }, []);

    return (
        <Box mt={3} mb={3}>
            <Card className={classes.root}>
                <Grid container spacing={0}>
                    <Grid container item xs={2} justify={"center"} alignItems="center" paddingRight={0}>
                        <div className={classes.profileDiv}>
                            <Avatar alt={props.data.firstName} src={`/api/photos/${props.data.employeeNumber}`} className={classes.profilePic} pr={0}/>
                        </div>
                    </Grid>
                    <Grid container item xs={5} justify={"flex-start"}>
                        <div className={classes.details}>
                            <CardContent>
                                <HeaderTypography align={"left"}>{props.data.firstName} {props.data.lastName}</HeaderTypography>
                                <SubheaderTypography align={"left"}>{props.data.title}</SubheaderTypography>
                                <SubheaderTypography align={"left"}> {props.data.groupAndOffice} </SubheaderTypography>
                                <ParagraphTypography align={"left"}>{props.data.bio}</ParagraphTypography>
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
                                    <IconTypography align={"left"}> <a class="link" href={emailLink}> {email} </a> </IconTypography><br/>
                                </div>
                                <div className={classes.content}>
                                    <TodayIcon className={classes.icon} align={"left"}/>
                                    <IconTypography align={"left"}> {props.data.hiredOn} </IconTypography><br/>
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
                                         View on Organization Chart ???
                                    </Link>
                                </div>
                                <div className={classes.orgChartLink}>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={async() => {
                                            let profileData = {
                                                employeeNumber: props.data.employeeNumber,
                                                title: props.data.title,
                                                groupName: props.data.groupName,
                                                lastName: props.data.lastName,
                                                firstName: props.data.firstName,
                                                status: "pinned"
                                            }
                                            if (isPinned == "Pin") {
                                                await storage.db.addDocument('pinnedProfiles', profileData);
                                                alert('Profile Pinned!');
                                                setIsPinned("Unpin");
                                            } else {
                                                await storage.db.delete('pinnedProfiles', props.data.employeeNumber);
                                                alert('Profile unpinned!');
                                                setIsPinned("Pin");
                                            }
                                            
                                        }}
                                    >
                                          ????{isPinned} this profile &ensp;
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