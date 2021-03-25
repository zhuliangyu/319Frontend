import React, {useState, useEffect} from 'react';
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import ManageContractorsAccordion from "../../components/manage-contractors-accordion";
import ManageAdminUsersAccordion from "../../components/manage-admin-users-accordion";
import Contractors from '../../components/contractors';

import contractor from '../../../services/contractor';

import "../page.css";

const AdminPage = () => {
  const heading_text = "Administrative Section";

  const [contractors, setContractors] = useState([]);
  useEffect(async () => {
    // console.log('running query string...');
    contractor.getAllContractors()
      .then(res => {
        // console.log(res);
        setContractors(res);
      })
  }, []);

  return (
    <div>
      <PageHeader />
      <PageTitle data={{ title: heading_text }} />
      <div className="page-contents-wrapper">
        <div className="page-contents-container">
            <ManageContractorsAccordion
                title={"Manage Contractors"}
                details={<Contractors data={contractors} />}/>
            <ManageAdminUsersAccordion
                title={"Manage Admin Users"}
                description={"Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet."}/>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
