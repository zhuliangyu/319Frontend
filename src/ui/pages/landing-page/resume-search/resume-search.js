import React, { useState, useEffect } from "react";
import "./resume-search.css";
import storage from "../../../../services/storage";
import SearchCard from "../../../components/search-card";

// TODO: handle delete search card

const ResumeSearch = (props) => {
  const [searchHistoryLS, syncSearchHistoryLS] = useState(
    JSON.parse(storage.ls.getPair("searchHistory"))
  );

  // console.log(searchHistoryLS);

  useEffect(() => {
    syncSearchHistoryLS(JSON.parse(storage.ls.getPair("searchHistory")));
  }, []);

  const handleDelete = () => {
    console.log("delete search history card clicked");
  };


  return (
    <div className="searches">
      <div className="searches-title">Resume Search</div>
      <div className="searches-history-cards">
        {searchHistoryLS !== null ? searchHistoryLS.map((historyItem) => (
          <SearchCard key={searchHistoryLS.indexOf(historyItem)} data={historyItem} deleteFn={() => {handleDelete()}} />
        )) : null }
      </div>
    </div>
  );
};

export default ResumeSearch;
