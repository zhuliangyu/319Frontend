import React from "react";
import logo from "../../../../assets/ae-logo.svg";
import SearchBar from "../../../components/search-bar";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import { IconButton } from "@material-ui/core";
import "./landing-header.css";
import {useHistory} from "react-router-dom";
import jwtManager from "../../../../services/jwt-manager";

const Header = () => {

    const history = useHistory()

    const handleAdminClick = (e) => {
        if (!jwtManager.hasToken()) {
            history.push(`/login`);
            window.location.reload();
        } else {
            history.push(`/admin`);
            window.location.reload();
        }
    }
  return (
    <div className="landing-header">

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
          onClick={handleAdminClick}
        >
          <PersonIcon color="primary" />
        </IconButton>
      </div>
      
    </div>
  );
};

export default Header;
