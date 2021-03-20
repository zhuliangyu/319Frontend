import React, { useState, useEffect } from "react";
import "./resume-search.css";
import storage from "../../../../services/storage";
import SearchCard from "../../../components/search-card";

// TODO: overflow horizontal, max two cards height
// TODO: handle delete search card
// TODO: stylize search card
// TODO: link search card to search page

const ResumeSearch = (props) => {
  const [searchHistoryLS, syncSearchHistoryLS] = useState(
    JSON.parse(storage.ls.getPair("searchHistory"))
  );

  // console.log(searchHistoryLS);

  useEffect(() => {
    syncSearchHistoryLS(JSON.parse(storage.ls.getPair("searchHistory")));
  }, []);

  return (
    <div className="searches">
      <div className="searches-title">Resume Search</div>
      <div className="searches-history-cards">
        {searchHistoryLS.map((historyItem) => (
          <SearchCard key={searchHistoryLS.indexOf(historyItem)} data={historyItem} />
        ))}
      </div>
    </div>
  );
};

export default ResumeSearch;
