import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Grid,
  withStyles,
  CardActionArea,
  Typography,
  CardContent,
  Card,
} from "@material-ui/core";
import profile from "../../../assets/profile.jpg";
import { useHistory } from "react-router-dom";
import arrow from "../../../assets/arrow.svg";
import "./profile-card-list.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    width: "100%",
    marginRight: 16,
    marginBottom: 10,
    flexGrow: 1,
  },
  details: {
    display: "flex",
    flexDirection: "row",
  },
  outerBox: {
    flex: "1 1 auto",
  },
  content: {
    alignItems: "center",
    flexWrap: "wrap",
    display: "flex",
  },
  cardContent: {
    padding: 16,
  },
  profilePic: {
    width: 75,
    height: 75,
  },
  icon: {
    color: "#26415C",
    fontFamily: "Poppins",
    fontSize: 30,
    fontWeight: 400,
    display: "inline-block",
    lineHeight: 300,
    align: "left",
  },
}));

const HeaderTypography = withStyles({
  root: {
    color: "#26415C",
    fontWeight: 600,
    fontSize: 18,
    fontFamily: "Poppins",
    lineHeight: 1.5,
  },
})(Typography);

const ParagraphTypography = withStyles({
  root: {
    color: "#868D98",
    fontFamily: "Poppins",
    fontSize: 14,
    lineHeight: 1.5,
    fontWeight: 400,
    align: "left",
  },
})(Typography);

const SubheaderTypography = withStyles({
  root: {
    color: "#868D98",
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: 600,
  },
})(Typography);

const ProfileCard = (props) => {
  const classes = useStyles();
  let history = useHistory();
  let name = props.data.firstName + " " + props.data.lastName;
  let title = props.data.title;
  let groupCode = props.data.groupCode;
  let officeCode = props.data.officeCode;
  let isContractor = props.data.isContractor;

  const handleCardOnClick = async () => {
    history.push(`/profile/${props.data.employeeNumber}`);
    window.location.reload();
  };

  return (
    <Card className={classes.root}>
      <CardActionArea style={{ paddingLeft: 20 }} onClick={handleCardOnClick}>
        <Grid container spacing={0}>
          <Grid
            container
            item
            xs={1}
            justify={"center"}
            alignItems="center"
            spacing={0}
          >
            <Avatar
              alt={name}
              src={profile}
              className={classes.profilePic}
              pr={0}
            />
          </Grid>
          <Grid container item xs={8} justify={"flex-start"}>
            <div className={classes.details}>
              <CardContent padding={0}>
                <HeaderTypography align={"left"}>{name}</HeaderTypography>
                <SubheaderTypography align={"left"}>
                  {title}
                </SubheaderTypography>
                <ParagraphTypography align={"left"}>
                  Group: {groupCode} & Office: {officeCode}
                </ParagraphTypography>
              </CardContent>
            </div>
          </Grid>
          <Grid container item xs={2} alignItems="center" justify="center">
            {isContractor ? (
              <div className="profile-card-list-button-contractor">
                <Typography>Contractor</Typography>
              </div>
            ) : (
              <div className="profile-card-list-button-permanent">
                <Typography>Permanent</Typography>
              </div>
            )}
          </Grid>
          <Grid container item xs={1} alignItems="center" justify="center">
            <img src={arrow} />
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default ProfileCard;