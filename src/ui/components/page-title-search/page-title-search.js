import React from "react";
import "./page-title-search.css";

const Title = (props) => {
  return (
    <div className="page-title-search-wrapper">
      <div className="page-title-search-box">
        <div className="page-title-search">{props.data.title}</div>
      </div>
    </div>
  );
};

export default Title;
