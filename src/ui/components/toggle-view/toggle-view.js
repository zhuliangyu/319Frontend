import React from "react";
import MuiToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Typography, withStyles } from "@material-ui/core";
import storage from '../../../services/storage';

const ToggleButton = withStyles({
  root: {
    width: 100,
    borderRadius: 10,
    textTransform: 'none',
    color: '#005CAB',
    borderColor: '#005CAB',
    '&:hover': {
      background: '#E5E5E5',
    },
    // height: 40,
    '&.Mui-selected': {
      background: '#005CAB',
      color: 'white',
      '&:hover': {
        color: '#005CAB',
      },
    },
  },
})(MuiToggleButton); 

const ToggleView = () => {
  const initView = () => {
    let currView = storage.ls.getPair('searchResultsView');
    if (!currView) {
      storage.ls.setPair('searchResultsView', 'grid');
      currView = 'grid';
    }
    return currView;
  }
  const [view, setView] = React.useState(initView);

  // TODO: use local storage or session storage for list/grid view state?
  const handleViewChange = (event, newView) => {
    setView(newView);
    storage.ls.setPair("searchResultsView", newView);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div>
      <ToggleButtonGroup value={view} exclusive onChange={handleViewChange}>
        <ToggleButton value="grid"><Typography>Grid</Typography></ToggleButton>
        <ToggleButton value="list"><Typography>List</Typography></ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ToggleView;
