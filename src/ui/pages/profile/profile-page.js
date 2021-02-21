import React, {useEffect, useState} from "react";
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import ProfileCardLarge from "../../components/profile-card-large";
import ReportingManagerField from "../../components/reporting-manager-field";
import ProfileAccordion from "../../components/profile-accordion";
import Footer from "../../components/footer/footer";
import {getProfileResults} from "../../../services/profile";
// import "../page.css";
import { useLocation, useParams } from 'react-router-dom';

const ProfilePage = (props) => {
  const heading_text = "Employee Profile";
  const location = useLocation();
  let { id } = useParams(); // dynamic part of url, in this case, employeeNumber
  console.log(id);

  const [profileResults, setProfileResults] = useState([]);

  useEffect(async () => {
      console.log("RUNNING useEFFECT IN ProfilePage");
      //todo: employeeID is hardCoded here - is should be given to the page when directed!
      getProfileResults(4).then(res => {
          console.log(res);
          setProfileResults(res)
      })

  }, [])


  return (
    <div>
      <PageHeader />
      <PageTitle data={{ title: heading_text }} />
      <div className="page-contents-wrapper">
        <div className="page-contents-container">
            <ProfileCardLarge
                data={profileResults}
            />
            <ReportingManagerField />
            <ProfileAccordion
                title={"Skills"}
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
