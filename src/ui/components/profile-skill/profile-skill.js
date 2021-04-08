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
        let data = await storage.db.searchDocument('metadata', {meta_id: `${meta_id}`});
        let all = await storage.db.searchDocument('metadata', {call_name: `Skill`});
        let raw = "";
        let metas = [];

        for (let x of all) {
            let firstMatch = 0;
            if (x.value_name == data[0].value_name) {
                metas.push(x.meta_id);
                if (firstMatch == 0) {
                    raw = x.meta_id
                    firstMatch = 1;
                } else {

                    raw = raw + "__" + x.meta_id;
                }
            }
        }

        let qstr = await filters.getQS(metas, null, [raw]);
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