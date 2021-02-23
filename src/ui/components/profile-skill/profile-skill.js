import React from 'react';
import './profile-skill.css';
import {Grid, withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const ParagraphTypography = withStyles({
    root: {
        color: '#868D98',
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: 400
    }
})(Typography);

const ProfileSkill = (props) => {
    let searchResults = props.data;

    // console.log(searchResults);

    return (
        <div>
            <ParagraphTypography>{searchResults.skillCategoryId} - {searchResults.skillId}</ParagraphTypography>
        </div>
    );
};

export default ProfileSkill;