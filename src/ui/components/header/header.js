import React from "react";
import "./header.css";
import Subheader from "./sub-header";
import jwtManager from "../../../services/jwt-manager"
import { useHistory } from "react-router-dom";
import Filter_modal from "../filter_modal/filter_modal"

const Header = (props) => {
  const location = window.location.pathname;
  const history = useHistory()
  // console.log(location === "/admin");

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
    <section className="header-wrapper">
      <div className="header-under-box-wrapper">
        <div className="header-under-box">
        <Subheader />
        <Filter_modal />
        </div>
      </div>
    </section>
  );
};

export default Header;
