import React from 'react';
import './profile-skill.css';
import {Grid, withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import filters from '../../../services/filters';
import storage from '../../../services/storage';

const ProfileSkill = (props) => {

    let history = useHistory()
    let linkBase = window.location.origin
    let searchLink = linkBase + "/search/"

    const handleSkillOnClick = async (e, meta_id) => {
        //todo: search by skill when the skill is clicked
        console.log(props.data);
        let qstr = await filters.getQS([meta_id], null, [meta_id]);
        storage.ss.setPair('search_key', null);
        await storage.ss.setPair('basisURI', qstr);
        history.push(`/search/?q=${qstr}`);
    };

    return (
        <div>
            <a class={"search-link"} onClick={(event) => {handleSkillOnClick(event, props.data.info.meta_id)}}>{props.data.name}</a>
        </div>
    );
};

export default ProfileSkill;