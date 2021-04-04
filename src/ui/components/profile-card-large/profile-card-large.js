import React, {useEffect, useState} from 'react';
import './profile-card-large.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Avatar, Box, CardMedia, Divider, Grid, Icon, Link, withStyles} from "@material-ui/core";
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import TodayIcon from '@material-ui/icons/Today';
import WorkIcon from '@material-ui/icons/Work';
import RoomIcon from '@material-ui/icons/Room';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useHistory } from "react-router-dom";
import storage from '../../../services/storage';
import Button from '@material-ui/core/Button';
import EventEmitter from '../../hooks/event-manager';


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
    let email = props.data.email;
    let emailLink= "mailto:" + email;

    useEffect(async() => {
        if(true) {
            let allPins = await storage.db.toArray('pinnedProfiles');

            let res = await allPins.filter((item) => {
                console.log(`${item.employeeNumber} == ${props.data.employeeNumber}`)
                if (item.employeeNumber == props.data.employeeNumber) {
                    return true;
                } else {
                    return false;
                }
            });
            if (res.length == 0) {
                document.querySelector("#profile-addpin").style.display = 'block';
                document.querySelector("#profile-removepin").style.display = 'none';
            } else {
                document.querySelector("#profile-removepin").style.display = 'block';
                document.querySelector("#profile-addpin").style.display = 'none';
            }
        }
    }, [props.data]);

    const addPin = async() => {
        let profileData = {
            employeeNumber: props.data.employeeNumber,
            title: props.data.title,
            groupName: props.data.groupName,
            lastName: props.data.lastName,
            firstName: props.data.firstName,
            status: "pinned"
        }
        await storage.db.addDocument('pinnedProfiles', profileData);
        EventEmitter.emit('alert', "Profile pinned to dashboard");
        document.querySelector("#profile-addpin").style.display = 'none';
        document.querySelector("#profile-removepin").style.display = 'block';
    }

    const removePin = async() => {
        let profileData = {
            employeeNumber: props.data.employeeNumber,
            title: props.data.title,
            groupName: props.data.groupName,
            lastName: props.data.lastName,
            firstName: props.data.firstName,
            status: "pinned"
        }
        await storage.db.delete('pinnedProfiles', props.data.employeeNumber);
        EventEmitter.emit('alert', "Profile unpinned from dashboard!");
        document.querySelector("#profile-removepin").style.display = 'none';
        document.querySelector("#profile-addpin").style.display = 'block';
    }

    return (
        <Box mt={3} mb={3}>
            <Card className="profile-card-large">
                <Grid container spacing={0}>
                    <Grid container item xs={2} justify={"center"} alignItems="center" paddingRight={0}>
                        <div className="profile-profileDiv">
                            <Avatar alt={props.data.firstName} src={`/api/photos/${props.data.employeeNumber}`} className="profile-profilePic" pr={0}/>
                            <div className="profile-pin" id="profile-addpin">
                                <Button onClick={addPin}>
                                    <AddIcon className="icon" align={"left"}/> Pin
                                </Button>
                            </div>
                            <div className="profile-pin" id="profile-removepin">
                                <Button onClick={removePin}>
                                    <RemoveIcon className="icon" align={"left"}/> Pin
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid container item xs={5} justify={"flex-start"}>
                        <div className="profile-details">
                            <CardContent>
                                <h1 align={"left"}>{props.data.firstName} {props.data.lastName}</h1>
                                <h2 align={"left"}>{props.data.title}</h2>
                                <h3 align={"left"}> {props.data.groupName}</h3>
                                <h4 align={"left"}> {props.data.officeName} Office @ {props.data.companyName} </h4>
                                <p align={"left"}>{props.data.bio}</p>
                            </CardContent>
                        </div>
                    </Grid>
                    <Grid container item xs={5} >
                        <div className="profile-cardContent">
                            <div className="profile-outerBox">
                                <div className="profile-content">
                                    <PhoneIcon className="icon" align={"left"}/>
                                    <IconTypography align={"left"}> {props.data.workCell}/{props.data.workPhone} </IconTypography> <br/>
                                </div>
                                <div className="profile-content">
                                    <EmailIcon className="icon" align={"left"}/>
                                    <IconTypography align={"left"}> <a class="link" href={emailLink}> {email} </a> </IconTypography><br/>
                                </div>
                                <div className="profile-content">
                                    <TodayIcon className="icon" align={"left"}/>
                                    <IconTypography align={"left"}> {props.data.hiredOn} </IconTypography><br/>
                                </div>
                                <div className="profile-content">
                                    <WorkIcon className="icon" align={"left"}/>
                                    <IconTypography align={"left"}> {props.data.employmentType} </IconTypography><br/>
                                </div>
                                <div className="profile-content">
                                    <RoomIcon className="icon" align={"left"}/>
                                    <IconTypography align={"left"}>Works from {props.data.locationName} </IconTypography><br/>
                                </div>
                                <div className="profile-orgChartLink">
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