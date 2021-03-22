import React from "react";
import { Avatar, Grid, CardActionArea, Typography, CardContent, Card } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import arrow from "../../../assets/arrow.svg";
import "./profile-card-list.css";

const ProfileCard = (props) => {
  let history = useHistory();
  let name = props.data.firstName + " " + props.data.lastName;
  let title = props.data.title;
  let groupName= props.data.groupName;
  let isContractor = props.data.isContractor;

  const handleCardOnClick = async () => {
    history.push(`/profile/${props.data.employeeNumber}`);
    window.location.reload();
  };

  return (
    <Card className="profile-list-card">
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
              src={`/api/photos/${props.data.employeeNumber}`}
              className="profilePic"
              pr={0}
            />
          </Grid>
          <Grid container item xs={8} justify={"flex-start"}>
            <div className="profile-details">
              <CardContent padding={0}>
                <span className="profile-list-heading">{name}</span>
                <span className="profile-list-subheading">{title}</span>
                <span className="profile-list-groupName">{groupName}</span>
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
