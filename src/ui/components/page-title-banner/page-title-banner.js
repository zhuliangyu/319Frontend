import React from "react";
import "./page-title-banner.css";

const Title = (props) => {
  return (
    <div className="page-title-wrapper">
      <div className="page-title-box">
        <div className="page-title">{props.data.title}</div>
      </div>
    </div>
  );
};

export default Title;
