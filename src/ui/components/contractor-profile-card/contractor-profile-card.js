import React from "react";
import { Avatar, Grid, CardActionArea, Button, CardContent, Card, Badge } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import './contractor-profile-card.css';

const ContractorProfileCard = (props) => {
  let history = useHistory();
  let name = `${props.data.firstName} ${props.data.lastName}`;
  let title = props.data.title;
  let groupName= props.data.groupName;
  let isContractor = props.data.isContractor;
  let clickButton = false;

  //console.log(props.data);

  const handleCardOnClick = async () => {
    if (!clickButton) {
      history.push(`/profile/${props.data.employeeNumber}`);
      window.location.reload();
    }
  };

  const handleButtonClick = async () => {
    clickButton = true;
    // pushes the contractor data onto edit page url
    history.push({pathname: `/editcontractor/${props.data.employeeNumber}`, state : props.data});
    window.location.reload();
  };

  return (
    <Card className="profile-grid-card">
      <CardActionArea onClick={handleCardOnClick}>
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

              <Button
                className="edit-contractor-button"
                variant={"contained"}
                size={"medium"}
                color={"primary"}
                onClick={handleButtonClick}
                text={"Edit"}>
                Edit
              </Button>

              </CardContent>
            </div>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};

export default ContractorProfileCard;
