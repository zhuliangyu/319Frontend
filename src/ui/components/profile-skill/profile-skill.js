import React from 'react';
import './profile-skill.css';
import {Grid, withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const ProfileSkill = (props) => {

    let history = useHistory()
    let linkBase = window.location.origin
    let searchLink = linkBase + "/search/"

    const handleSkillOnClick = async () => {
        //todo: search by skill when the skill is clicked
        history.push(`/search/}`);
        window.location.reload();
    };

    return (
        <div>
            <a class={"search-link"} href={searchLink} onClick={handleSkillOnClick}>{props.data}</a>
        </div>
    );
};

export default ProfileSkill;