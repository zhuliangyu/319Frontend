import React from "react";
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import "../page.css";

const ProfilePage = () => {
  const heading_text = "Employee Profile";

  return (
    <div>
      <PageHeader />
      <PageTitle data={{ title: heading_text }} />
      <div className="page-contents-wrapper">
        <div className="page-contents-container">
          *profile contents go here*
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
