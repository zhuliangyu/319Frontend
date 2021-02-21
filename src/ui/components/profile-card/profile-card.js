import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
  Avatar,
  Box,
  CardMedia,
  Divider,
  Grid,
  Icon,
  withStyles,
} from "@material-ui/core";
import profile from "../../../assets/profile.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    width: 280,
    marginRight: 16,
    marginBottom: 10,
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
  return (
    <Card className={classes.root}>
      <Grid container spacing={0}>
        <Grid
          container
          item
          xs={4}
          justify={"center"}
          alignItems="center"
          paddingright={0}
          spacing={0}
        >
          <Avatar
            alt={props.data.firstName}
            src={profile}
            className={classes.profilePic}
            pr={0}
          />
        </Grid>
        <Grid container item xs={8} justify={"flex-start"}>
          <div className={classes.details}>
            <CardContent padding={0}>
              <HeaderTypography align={"left"}>
                {props.data.firstName} {props.data.lastName}
              </HeaderTypography>
              <SubheaderTypography align={"left"}>
                {props.data.title}
              </SubheaderTypography>
              <ParagraphTypography align={"left"}>
                Group {props.data.groupCode} - Office {props.data.officeCode}
              </ParagraphTypography>
            </CardContent>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProfileCard;
