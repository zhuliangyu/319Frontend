import React, {useEffect, useState} from "react";
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import ProfileCardLarge from "../../components/profile-card-large";
import ProfileAccordion from "../../components/profile-accordion";
import Footer from "../../components/footer/footer";
import {getProfileResults} from "../../../services/profile";
// import "../page.css";
import { useLocation, useParams } from 'react-router-dom';
import ProfileCard from "../../components/profile-card";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import SkillsAccordion from "../../components/skills-accordion";

const useStyles = makeStyles((theme) => ({
    reportingManagerBox: {
    },
    header: {
        color: "#26415C",
        fontWeight: 600,
        fontSize: 30,
        fontFamily: 'Poppins',
        flexDirection: 'row',
    },
    title: {
        padding: 16,
    }, content: {
        display: 'flex'
    }
}))

const HeaderTypography = withStyles({
    root: {
        color: "#26415C",
        fontWeight: 600,
        fontSize: 30,
        fontFamily: 'Poppins',
    }
})(Typography);

const ProfilePage = (props) => {
    const classes = useStyles();
  const heading_text = "Employee Profile";
  const location = useLocation();
  let { id } = useParams(); // dynamic part of url, in this case, employeeNumber
  console.log(id);

  const [profileResults, setProfileResults] = useState([]);
  const [skills, setSkills] = useState([]);
  const [supervisorResults, setSupervisorResults] = useState([]);

  useEffect(async () => {
      console.log("RUNNING useEFFECT IN ProfilePage");
      //todo: employeeID is hardCoded here - is should be given to the page when directed!
      getProfileResults(id).then(res => {
          console.log(res);
          setProfileResults(res)
          setSkills(res.skills)
          setSupervisorResults(res.supervisor)
      })

  }, [])

  //todo: update ProfileCard data to have supervisor's results (currently only has profile results)
  return (
    <div>
      <PageHeader />
      <PageTitle data={{ title: heading_text }} />
      <div className="page-contents-wrapper">
        <div className="page-contents-container">
            <ProfileCardLarge
                data={profileResults}
            />
            <div className={classes.reportingManagerBox} >
                <div className={classes.title}>
                    <HeaderTypography align={"left"} >Reporting Managers</HeaderTypography>
                </div>
                <div className={classes.content}>

                    <ProfileCard data={supervisorResults}  />
                </div>
            </div>
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
