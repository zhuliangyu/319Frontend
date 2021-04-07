import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Box, withStyles} from "@material-ui/core";
import ProfileSkill from "../profile-skill/profile-skill";
import {getOrgChartResults} from "../../../services/org-chart";
import storage from "../../../services/storage";
import "./skills-accordion.css"
import EventEmitter from "../../hooks/event-manager";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const HeaderTypography = withStyles({
    root: {
        color: "#26415C",
        fontWeight: 600,
        fontSize: 30,
        fontFamily: 'Poppins'
    }
})(Typography);

const SubheaderTypography = withStyles({
    root: {
        color: '#868D98',
        fontFamily: 'Poppins',
        fontSize: 24,
        fontWeight: 600
    }
})(Typography);

const ParagraphTypography = withStyles({
    root: {
        color: '#868D98',
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: 400
    }
})(Typography);



const SkillsAccordion = (props) => {
    const classes = useStyles();
    const [skills, setSkills] = useState()
    const [expanded, setExpanded] = React.useState('accordionPanel');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    let [skillArray, setSkillArray] = useState([]);
    useEffect(async () => {
        storage.db.searchDocument('metadata', {call_name: "Skill"}).then((res) => {

            let skillIdArray = props.data;
            let tempArray = [];
            skillIdArray.forEach((skill) => {
                let skillName;
                let meta;
                res.forEach((skillListing) => {
                    if (skill.skillCategoryId === skillListing.value_id[0] && skill.skillId === skillListing.value_id[1]) {
                        skillName = skillListing.value_name;
                        meta = skillListing;
                    }
                });
                tempArray.push({name: skillName, info: meta});
            });

            setSkillArray(tempArray);
        })

    }, []);

    let hasSkills = skillArray.length !== 0

    return (
        <Box marginTop={2} marginBottom={2}>
            <div className={classes.root}>
                <Accordion expanded={expanded === 'accordionPanel'} onChange={handleChange('accordionPanel')} defaultExpanded={true} >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="accordion-panel-content"
                        id="accordion-panel-header"
                    >
                        <h1>
                            Skills
                        </h1>
                    </AccordionSummary>
                    <AccordionDetails>
                        { hasSkills? (
                                <div >
                                    {skillArray.map((skill) =>
                                        <ProfileSkill data={skill} />
                                    )
                                    }
                                </div>
                        ) : (
                            <p className={"no-skills"}>no info available</p>
                        )
                        }
                    </AccordionDetails>
                </Accordion>
            </div>
        </Box>
    );
}

export default SkillsAccordion;