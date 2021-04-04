import React from "react";
import { Avatar, Grid, CardActionArea, Typography, CardContent, Card, Badge } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import './profile-card.css';

const ProfileCard = (props) => {
  let history = useHistory();
  let name = `${props.data.firstName} ${props.data.lastName}`;
  let title = props.data.title;
  let groupName= props.data.groupName;
  let isContractor = props.data.isContractor;

  const handleCardOnClick = async () => {
    history.push(`/profile/${props.data.employeeNumber}`);
    window.location.reload();
  };

  return (
    <Card className="profile-grid-card">
      <CardActionArea  onClick={handleCardOnClick}>
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
            <Badge
              overlap="circle"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={isContractor ? 
                (<div className='contractor-badge'>
                  C
                </div>) : null}
            >
              <Avatar
                alt={name}
                src={`/api/photos/${props.data.employeeNumber}`}
                className="profilePic"
                pr={0}
              />
            </Badge>
          </Grid>
          <Grid container item xs={8} justify={"flex-start"}>
            <div className="profile-details">
              <CardContent padding={0}>
              <span className="profile-grid-heading">{name}</span>
              <span className="profile-grid-subheading">{title}</span>
              <span className="profile-grid-groupName">{groupName}</span>
              </CardContent>
            </div>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default ProfileCard;
