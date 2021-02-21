import React from "react";
import "./header.css";
import logo from "../../../assets/ae-logo.svg";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import { IconButton } from "@material-ui/core";
import SearchBar from "../../components/search-bar";
import Subheader from "./sub-header";
import { Link } from "react-router-dom";

const Header = (props) => {
  const location = window.location.pathname;
  // console.log(location === "/admin");

  return (
    <div className="header-wrapper">
      <div className="header-box">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Associated Engineering" />
          </Link>
        </div>

        <div className="searchbar">
          <SearchBar />
        </div>

        <div className="nav">
          <IconButton type="button" className="iconButton">
            <SettingsIcon color="primary" />
          </IconButton>
          <IconButton type="button" className="iconButton">
            <PersonIcon color="primary" />
          </IconButton>
        </div>
      </div>

      {location === "/admin" ? null : (
        <div className="header-under-box-wrapper">
          <div className="header-under-box">
            <Subheader />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
