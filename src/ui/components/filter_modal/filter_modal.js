/*
    Filter Modal Component
 */

import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import filters from "../../../services/filters";
import Button from '@material-ui/core/Button';
import storage from '../../../services/storage';
import { useHistory, useLocation } from "react-router-dom";
import * as qs from 'query-string';
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
 let selectionRaw = [];
 const Filter_modal = () => {
    let history = useHistory();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const [value, setTabValue] = React.useState(0);
    const [filterDocs, setFilterDocs] = React.useState(null);
    let [selectionData, setSelectionData] = useState(selectionRaw);
    let idx = 0;
    
    useEffect(() => {
        document.getElementById("filter_open_button").onclick = async() => {
            setOpen(true);
            let query = qs.parse(location.search);
            console.log(query);
            if (query.q) {
              let data = JSON.parse(decodeURIComponent(query.q));
              console.warn(data.meta);
              if(data.meta) {
                selectionRaw = data.meta;
                setSelectionData(selectionRaw);
                for (let x of selectionRaw) {
                  let item = x.split("__");
                  selection = selection.concat(item);
                }
              }
            }
            //selection = [];
            let filterManifest = await filters.getFilterList("Selection");

            for (let i = 0; (i < filterManifest.length); i++) {
              let item = filterManifest[i];
              let supplimentaryData = [];
              let buildManifest = [];
              for (let metaitem of item.metadata) {
                let val = `${metaitem.call_name}_${metaitem.value_name}`;
                if(!supplimentaryData.includes(val)) {
                  supplimentaryData.push(val);
                  buildManifest.push(metaitem);
                } else {
                  let meta_id = buildManifest[supplimentaryData.indexOf(val)].meta_id;
                  meta_id = meta_id + `__${metaitem.meta_id}`;
                  buildManifest[supplimentaryData.indexOf(val)].meta_id = meta_id;
                }
                filterManifest[i].metadata = buildManifest;
              }
            }
            setFilterDocs(filterManifest);
        }

      }, [history.location.key]);

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleFilterSelection = (event) => {
        
        if (event.target.checked) {
            selectionRaw.push(event.target.value);
            let userSel = event.target.value.split("__");
            selection = selection.concat(userSel);
        } else if (selectionRaw.indexOf(event.target.value) > -1) {
            selectionRaw.splice(selectionRaw.indexOf(event.target.value),1);
            let userSel = event.target.value.split("__");
            for (let x of userSel) {
              selection.splice(selection.indexOf(x),1);
            }
        }

        selection = [...new Set(selection)];
        selectionRaw = [...new Set(selectionRaw)];
        setSelectionData(selectionRaw);
        
    }

    const handleSubmit = async() => {
        // console.log('filter modal selection', selection);
        let attach = await storage.ss.getPair('search_key');
        attach = JSON.parse(attach);
        let qstr = await filters.getQS(selection, attach, selectionRaw);
        await storage.ss.setPair('currentURI', null);
        setOpen(false);
        history.push(`/search?q=${qstr}`);
        //document.getElementById("search_button_target").click();
    }

    const handleFormReset = async() => {
      /*for (let meta_id of selection) {
        console.log(meta_id.replaceAll(',','_'));
        try {
          let element = document.querySelector(`#${meta_id.replaceAll(',','_')}`);
          element.checked = true;
          console.log(element);
        } catch (e) {
          continue;
        }
      }*/
    }

    const getCheckboxState = (meta_id) => {
      if (selection.includes(meta_id)) {
        return true;
      } else {
        return false;
      }
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
                    {filterDoc.metadata.map((e) => (
                        <FormGroup row key={`panelrow-${idx}-${e.meta_id}`}>
                            <FormControlLabel
                                control={<Checkbox value={e.meta_id} name="filter_checkbox" checked={selectionData.includes(e.meta_id)} onChange={handleFilterSelection} color="primary"/>}
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