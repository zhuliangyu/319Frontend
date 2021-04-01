/*
    Filter Modal Component
 */

import React, { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import filters from "../../../services/filters";
import Button from '@material-ui/core/Button';


function TabPanel(props) {
    const {children, value, index} = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        className="vertical-tabpanel"
        aria-labelledby={`vertical-tab-${index}`}
      >
        {value === index && (
          <section className="tabpanel_padding">
            {children}
          </section>
        )}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
      key: index
    };
  }

 let selection = [];
 const Filter_modal = () => {
    const [open, setOpen] = React.useState(false);
    const [value, setTabValue] = React.useState(0);
    const [filterDocs, setFilterDocs] = React.useState(null);
    let idx = 0;
    
    useEffect(() => {
        document.getElementById("filter_open_button").onclick = async() => {
            setOpen(true);
            filters.clear();
            selection = [];
            let filterManifest = await filters.getFilterList("Selection");
            setFilterDocs(filterManifest);
        }

      }, []);

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleFilterSelection = (event) => {
        
        if (event.target.checked) {
            selection.push(event.target.value);
        } else if (selection.indexOf(event.target.value) > -1) {
            selection.splice(selection.indexOf(event.target.value),1);
        }
    }

    const handleSubmit = async() => {
        setOpen(false);
        // console.log('filter modal selection', selection);
        await filters.set(selection);
        document.getElementById("search_button_target").click();
    }

    const handleChangeTabs = (event, newValue) => {
      setTabValue(newValue);
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
            <div className="tabpanel_wrapper">
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChangeTabs}
            >
              {filterDocs !== null ? (filterDocs.map((filterDoc) => (
                <Tab label={filterDoc.display_name} {...a11yProps(filterDoc._uuid)} />
              ))) : (null)}
            </Tabs>

            {filterDocs !== null ? (filterDocs.map((filterDoc) => (
              <TabPanel key={'panel-'+idx} value={value} index={idx++}>
                    {filterDoc.input.map((e) => (
                        <FormGroup row key={`panelrow-${idx}-${e.value_id.toString()}`}>
                            <FormControlLabel
                                control={<Checkbox value={filterDoc.call_name +","+ e.value_id.toString()} name="filter_checkbox" onChange={handleFilterSelection} color="primary"/>}
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