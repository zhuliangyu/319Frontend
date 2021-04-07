import React, { useState, useEffect } from "react";
import "./resume-search.css";
import storage from "../../../../services/storage";
import SearchCard from "../../../components/search-card";

// TODO: overflow horizontal, max two cards height
// TODO: handle delete search card
// TODO: stylize search card
// TODO: link search card to search page

const ResumeSearch = (props) => {
  const [searchHistoryLS, syncSearchHistoryLS] = useState([]);

  // console.log(searchHistoryLS);

  useEffect(async() => {
    let data = await storage.db.toArray('searchHistory');
    data = data.slice(0,4);
    console.log(data);
    syncSearchHistoryLS(data);
  }, []);

  const handleDelete = () => {
    console.log("delete search history card clicked");
  };


  return (
    <div className="searches">
      <div className="searches-title">Resume Search</div>
      <div className="searches-history-cards">
        {searchHistoryLS != null ? searchHistoryLS.map((historyItem) => (
          <SearchCard key={searchHistoryLS.indexOf(historyItem)} data={historyItem} deleteFn={() => {handleDelete()}} />
        )) : null }
      </div>
    </div>
  );
};

export default ResumeSearch;
