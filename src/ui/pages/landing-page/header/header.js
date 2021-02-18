import React from "react";
import logo from "../../../../assets/ae-logo.svg";
import SearchBar from "../search-bar-landing";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import { IconButton } from "@material-ui/core";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="Associated Engineering" />
      </div>
      <div className="spacing"></div>
      <div className="searchbar">
        <SearchBar />
      </div>
      <div className="spacing"></div>
      <div className="nav">
        <IconButton
          type="button"
          className="iconButton"
        >
          <SettingsIcon color="primary" />
        </IconButton>
        <IconButton
          type="button"
          className="iconButton"
        >
          <PersonIcon color="primary" />
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
