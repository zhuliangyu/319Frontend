import React, {useState, useEffect} from 'react';
import PageHeader from "../../components/header";
import ManageContractorsAccordion from "../../components/manage-contractors-accordion";
import ManageAdminUsersAccordion from "../../components/manage-admin-users-accordion";
import Contractors from '../../components/contractors';
import {useHistory} from "react-router-dom";

import contractor from '../../../services/contractor';

import "../page.css";
import AdminTitle from "../../components/admin-page-title-banner";

const AdminPage = () => {
  const heading_text = "Administrative Section";
  const history = useHistory()

  const [contractors, setContractors] = useState([]);
  useEffect(async () => {
    contractor.getAllContractors().then(res => {
        setContractors(res);
      }).catch(error => {
        if (error.response.status === 401) {
          alert("Please log in first.");
          history.push(`/login`);
          window.location.reload();
        }
      })
  }, []);

  return (
    <div>
      <PageHeader />
      <AdminTitle data={{ title: heading_text }} />
      <div className="page-contents-wrapper">
        <div className="page-contents-container">
            <ManageContractorsAccordion
                title={"Manage Contractors"}
                details={<Contractors data={contractors} />}/>
            {/*Manage admin user not supported*/}
            {/*<ManageAdminUsersAccordion*/}
            {/*    title={"Manage Admin Users"}*/}
            {/*    description={"Manage admin users here."}/>*/}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
