import React, {useEffect, useState} from "react";
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import ProfileCardLarge from "../../components/profile-card-large";
import ProfileAccordion from "../../components/profile-accordion";
import Footer from "../../components/footer/footer";
import {getProfileResults} from "../../../services/profile";
import {useParams} from "react-router-dom";
import OrgChart from "../../components/org-chart";
import {getOrgChartResults} from "../../../services/org-chart";
import './org-chart-page.css';

const OrgChartPage = () => {
    const heading_text = "Organizational Chart";

    const [orgChartResults, setOrgChartResults] = useState([]);
    let { id } = useParams();

    useEffect(async () => {
        getOrgChartResults(id).then(res => {
            console.log(res);
            setOrgChartResults(res)
        })

    }, [])


    return (
        <div>
            <PageHeader />
            <PageTitle data={{ title: heading_text }} />
            <div className="page-contents-wrapper">
                <div className="page-contents-container">
                    <OrgChart
                        data={orgChartResults}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrgChartPage;
