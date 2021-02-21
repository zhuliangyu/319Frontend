import React, { useEffect } from "react";
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import ProfileCardLarge from "../../components/profile-card-large";
import ReportingManagerField from "../../components/reporting-manager-field";
import ProfileAccordion from "../../components/profile-accordion";
import Footer from "../../components/footer/footer";
// import "../page.css";
import { useLocation, useParams } from 'react-router-dom';

const ProfilePage = (props) => {
  const heading_text = "Employee Profile";
  const location = useLocation();
  let { id } = useParams(); // dynamic part of url, in this case, employeeNumber
  console.log(id);

  return (
    <div>
      <PageHeader />
      <PageTitle data={{ title: heading_text }} />
      <div className="page-contents-wrapper">
        <div className="page-contents-container">
            <ProfileCardLarge
                image={"n/a"}
                name={"Employee Name"}
                designation={"Designation"}
                description={""}
                group={"Group"}
                officeLocation={"Office Location"}
                description={"My 3 line description is Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eros libero, dignissim in lacus nec, tempor luctus mauris."}
                phone={"1-123-456-7890"}
                email={"firstlast@email.com"}
                hours={"09:00 - 17:00 (Pacific Time)"}
                employeeStatus={"Contract Employee"}/>
            <ReportingManagerField />
            <ProfileAccordion
                title={"Profile Section 1"}
                description={"Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet."}/>
            <ProfileAccordion
                title={"Profile Section 2"}
                description={"Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet."}/>
            <ProfileAccordion
                title={"Profile Section 3"}
                description={"Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit. Pellentesque convallis laoreet laoreet."}/>
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default ProfilePage;
