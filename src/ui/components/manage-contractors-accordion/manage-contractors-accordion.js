import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button, Box, withStyles} from "@material-ui/core";
import {useHistory} from "react-router-dom";

import './manage-contractors-accordion.css';

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

const ManageContractorsAccordion = ({title, details}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const history = useHistory()
    const handleClick = async () => {
        history.push(`/contractor`);
        window.location.reload();
      };

    return (
        <Box marginTop={2} marginBottom={2}>
            <div className={classes.root}>
                <Accordion expanded={expanded === 'accordionPanel'} onChange={handleChange('accordionPanel')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="accordion-panel-content"
                        id="accordion-panel-header"
                    >
                        <HeaderTypography>
                            {title}
                        </HeaderTypography>
                        &emsp;&emsp;&emsp;&emsp;
                        &emsp;&emsp;&emsp;&emsp;
                        <Button
                            className="add-contractor-button"
                            variant={"contained"}
                            size={"medium"}
                            color={"primary"}
                            onClick={handleClick}
                            text={"Add A Contractor"}>
                            Add A Contractor
                        </Button>

                    </AccordionSummary>
                    <AccordionDetails>
                            {details}
                    </AccordionDetails>
                </Accordion>
            </div>
        </Box>
    );
}

export default ManageContractorsAccordion