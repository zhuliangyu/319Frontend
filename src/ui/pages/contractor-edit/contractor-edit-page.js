import React, {useState, useEffect} from 'react';
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import { useParams } from 'react-router-dom';
import "../page.css";
import ContractorForm from "../../components/contractor-form";
import { useLocation } from "react-router-dom";
import AdminTitle from "../../components/admin-page-title-banner";

// stub
const ContractorEditPage = () => {
    const heading_text = "Contractor";
    const location = useLocation();
    let { id } = useParams();
    // access the contractor data through location.state
    // console.log(id, location.state);

    return (
        <div>
            <AdminTitle data={{ title: heading_text }} />
            <div className="page-contents-wrapper">
                <div className="page-contents-container" >
                    <ContractorForm data={location.state}/>
                </div>
            </div>
        </div>
    );
};

export default ContractorEditPage;