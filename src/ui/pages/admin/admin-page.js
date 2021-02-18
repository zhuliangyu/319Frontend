import React from "react";
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import "../page.css";

const AdminPage = () => {
  const heading_text = "Administrative Section";

  return (
    <div>
      <PageHeader />
      <PageTitle data={{ title: heading_text }} />
      <div className="page-contents-wrapper">
        <div className="page-contents-container">
          *admin contents go here*
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
