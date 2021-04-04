import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Box, withStyles} from "@material-ui/core";
import './style.css';

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

const ProfileAccordion = ({title, description}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState('accordionPanel');

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box marginTop={2} marginBottom={2}>
            <div className="profile-accordion">
                <Accordion defaultExpanded={true} expanded={expanded === 'accordionPanel'} onChange={handleChange('accordionPanel')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="accordion-panel-content"
                        id="accordion-panel-header"
                    >
                        <h1>
                            {title}
                        </h1>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ParagraphTypography>
                            {description}
                        </ParagraphTypography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Box>
    );
}

export default ProfileAccordion