import React from "react";
import "./search-results.css";
import ProfileCard from "../profile-card";

const SearchResults = (props) => {
  return (
    <div className="search-results-wrapper">
      <div className="search-results-container">
        <ProfileCard />
      </div>
    </div>
  );
};

export default SearchResults;
