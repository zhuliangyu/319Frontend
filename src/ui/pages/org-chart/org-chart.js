import React, {useEffect, useState} from "react";
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import ProfileCardLarge from "../../components/profile-card-large";
import ReportingManagerField from "../../components/reporting-manager-field";
import ProfileAccordion from "../../components/profile-accordion";
import Footer from "../../components/footer/footer";
import {getProfileResults} from "../../../services/profile";

const OrgChart = () => {
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
                    <OrgChart
                        data={profileResults}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrgChart;
