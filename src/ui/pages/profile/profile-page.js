import React, {useEffect, useState} from "react";
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import ProfileCardLarge from "../../components/profile-card-large";
import ReportingManagerField from "../../components/reporting-manager-field";
import ProfileAccordion from "../../components/profile-accordion";
import Footer from "../../components/footer/footer";
import {getProfileResults} from "../../../services/profile";
// import "../page.css";

const ProfilePage = () => {
  const heading_text = "Employee Profile";

  const [profileResults, setProfileResults] = useState([]);

  useEffect(async () => {
      console.log("RUNNING useEFFECT IN ProfilePage");
      getProfileResults(5).then(res => {
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
