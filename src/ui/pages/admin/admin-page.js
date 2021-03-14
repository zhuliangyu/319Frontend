import React from "react";
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import ManageContractorsAccordion from "../../components/manage-contractors-accordion";
import ManageAdminUsersAccordion from "../../components/manage-admin-users-accordion";

import "../page.css";

const AdminPage = () => {
  const heading_text = "Administrative Section";

  return (
    <div>
      <PageHeader />
      <PageTitle data={{ title: heading_text }} />
      <div className="page-contents-wrapper">
        <div className="page-contents-container">
            <ManageContractorsAccordion
                title={"Manage Contractors"}
                description={"Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet."}/>
            <ManageAdminUsersAccordion
                title={"Manage Admin Users"}
                description={"Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet."}/>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
