import React from "react";
import "./page-title-search.css";
import ToggleView from "../../components/toggle-view";

const Title = (props) => {
  return (
    <div className="page-title-search-wrapper">
      <div className="page-title-search-box">
        <div className="page-title-search">{props.data.title}</div>
        <div className="page-title-search-toggle">
          <ToggleView />
        </div>
      </div>
    </div>
  );
};

export default Title;
