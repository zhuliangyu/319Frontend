/*
    Filter Modal Component
 */

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import filters from "../../../services/filters";
import Button from '@material-ui/core/Button';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        className="vertical-tabpanel"
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 300,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));

 let selection = [];
 const Filter_modal = () => {
    const [open, setOpen] = React.useState(false);
    let idx = 0;
    const [filterDocs, setFilterDocs] = React.useState(null);
    useEffect(() => {
        document.getElementById("filter_open_button").onclick = async() => {
            setOpen(true);
            filters.clear();
            selection = [];
            let filterManifest = await filters.getFilterList("Selection");
            console.table(filterManifest);
            setFilterDocs(filterManifest);
        }

      }, []);
    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    
    const popSelect = (event) => {
        
        if (event.target.checked) {
            selection.push(event.target.value);
        } else if (selection.indexOf(event.target.value) > -1) {
            delete selection[selection.indexOf(event.target.value)];
        }
    }

    const handleSubmit = () => {
        setOpen(false);
        filters.set(selection);
    }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            id="filter_modal"
          >
            <section className="modal_body">
            <h3>Advanced Search</h3>
            <div className={classes.root}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label=""
              className={classes.tabs}
            >
                {filterDocs !== null ? (filterDocs.map((filterDoc) => (
                    <Tab label={filterDoc.display_name} {...a11yProps(filterDocs._uuid)} />
                ))) : (null)}
        
            </Tabs>

            {filterDocs !== null ? (filterDocs.map((filterDoc) => (
                <TabPanel value={value} index={idx++}>
                    {filterDoc.input.map((e) => (
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox value={filterDoc.call_name +","+ e.value_id.toString()} name="filter_checkbox" onChange={popSelect} color="primary"/>}
                                label={e.value_name}
                            />
                        </FormGroup> 
                    ))}
                </TabPanel>
            ))) : (null)}
            
        
          </div>
            <Button variant="contained" id="submit_filters" onClick={handleSubmit} color="primary">
                Apply Filters →
            </Button>
            </section>
          </Modal>
        </div>
      );
 }

 export default Filter_modal;