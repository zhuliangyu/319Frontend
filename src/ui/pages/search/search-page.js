import React from "react";
import PageHeader from "../../components/header";
import PageTitleSearch from "../../components/page-title-search";
import SearchResults from "../../components/search-results";

const SearchPage = () => {
  const heading_text = "Search Results";

  return (
    <div>
      <PageHeader />
      <PageTitleSearch data={{ title: heading_text }} />
      <SearchResults />
    </div>
  );
};

export default SearchPage;
