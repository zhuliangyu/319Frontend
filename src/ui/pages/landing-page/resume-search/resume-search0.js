import React, { useState } from "react";
import "./resume-search.css";
import storage from "../../../../services/storage";
import SearchCard from "../../../components/search-card";

const ResumeSearch = () => {
  const initResumeSearch = () => {
    let currSearchHistory = JSON.parse(storage.ls.getPair("searchHistory"));
    if (!currSearchHistory) {
      storage.ls.setPair("searchHistory", JSON.stringify([]));
    }
    return currSearchHistory;
  };
  const [searchHistoryLS, syncSearchHistoryLS] = useState(initResumeSearch);

  const handleDelete = async (id) => {
    let items = [...searchHistoryLS];
    async function updateLS() {
      items = items.filter(item => item.id !== id);
      syncSearchHistoryLS(items);
    }
    await updateLS();
    storage.ls.setPair("searchHistory", JSON.stringify(items));
  };

  return (
    <div className="searches">
      <div className="searches-title">Resume Search</div>
      <div className="searches-history-cards">
        {searchHistoryLS.length > 0 ? (
          searchHistoryLS.map((historyItem) => (
            <SearchCard
              key={historyItem.id}
              data={historyItem.historyItem}
              id={historyItem.id}
              deleteFn={() => {
                handleDelete(historyItem.id);
              }}
            />
          ))
        ) : (
          <center>
            <b>{`💬 No recent searches.`}</b>
          </center>
        )}
      </div>
    </div>
  );
};

export default ResumeSearch;
