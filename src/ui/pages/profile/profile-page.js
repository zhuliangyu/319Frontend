import React, {useEffect, useState} from "react";
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import ProfileCardLarge from "../../components/profile-card-large";
import ProfileAccordion from "../../components/profile-accordion";
import Footer from "../../components/footer/footer";
import {getProfileResults} from "../../../services/profile";
import "./profile-page.css";
import { useLocation, useParams } from 'react-router-dom';
import ProfileCard from "../../components/profile-card";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import SkillsAccordion from "../../components/skills-accordion";
import Filter_modal from '../../components/filter_modal/filter_modal';

const HeaderTypography = withStyles({
    root: {
        color: "#26415C",
        fontWeight: 600,
        fontSize: 30,
        fontFamily: 'Poppins',
    }
})(Typography);

const ProfilePage = (props) => {
  const heading_text = "Employee Profile";
  const location = useLocation();
  let { id } = useParams(); // dynamic part of url, in this case, employeeNumber
  console.log(id);

  const [profileResults, setProfileResults] = useState([]);
  const [skills, setSkills] = useState([]);
  const [supervisorResults, setSupervisorResults] = useState([]);

  useEffect(async () => {
      console.log("RUNNING useEFFECT IN ProfilePage");
      getProfileResults(id).then(res => {
          setProfileResults(res)
          setSkills(res.skills)
          res.supervisor.employeeNumber = res.supervisorEmployeeNumber
          res.supervisor.groupCode = res.supervisor.group_id
          res.supervisor.officeCode = res.supervisor.office_id
          setSupervisorResults(res.supervisor)
          console.log(res);
      })

  }, [])

  return (
    <div>
      <PageHeader />
      <Filter_modal/>
      <PageTitle data={{ title: heading_text }} />
      <div className="page-contents-wrapper">
        <div className="page-contents-container">
            <ProfileCardLarge
                data={profileResults}
            />
            {profileResults.employeeNumber !== supervisorResults.employeeNumber ?
                (
                    <div className={"reporting-manager-box"}>
                        <div className={"title"}>
                            <HeaderTypography align={"left"}>Reporting Managers</HeaderTypography>
                        </div>
                        <div className={"content"}>

                            <ProfileCard data={supervisorResults}/>
                        </div>
                    </div>
                ) :
                (
                    <div className={"reporting-manager-box"}/>
                )
            }
            <SkillsAccordion data={skills}/>
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
