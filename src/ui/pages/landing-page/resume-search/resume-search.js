import React, { useState, useEffect } from "react";
import "./resume-search.css";
import storage from "../../../../services/storage";
import SearchCard from "../../../components/search-card";

const ResumeSearch = (props) => {
    const [searchHistory, syncSearchHistory] = useState([]);

    // console.log(searchHistoryLS);

    useEffect(async () => {
        let data = await storage.db.toArray("searchHistory");
        data = data.slice(0, 8);
        console.log(data);
        syncSearchHistory(data);
    }, []);

    const handleDelete = async (uid) => {
        console.log("delete search history card clicked");
        let items = [...searchHistory];
        async function updateSearchHistory() {
          items = items.filter(item => item.uid !== uid);
          syncSearchHistory(items);
        }
        await updateSearchHistory().then(async () => {
            await storage.db.clearTable('searchHistory');
            await storage.db.updateDocuments('searchHistory', items);
        })
    };

    return (
        <div className="searches">
            <div className="searches-title">Resume Search</div>
            <div className="searches-history-cards">
                {searchHistory.length > 0 ? (
                    searchHistory.map((historyItem) => (
                        <SearchCard
                            key={historyItem.uid}
                            data={historyItem}
                            id={historyItem.uid}
                            deleteFn={() => {
                                handleDelete(historyItem.uid);
                            }}
                        />
                    ))
                ) : (
                  <div><center><p class="generic-msg">🔎 No recent searches</p></center></div>
                )}
            </div>
        </div>
    );
};

export default ResumeSearch;
