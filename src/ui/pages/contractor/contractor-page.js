import React from "react";
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import "../page.css";
import ContractorForm from "../../components/contractor-form";

// stub
const ContractorPage = () => {
    const heading_text = "Contractor";
    let formData = {hasData: false, contractorData: null}

    return (
        <div>
            <PageTitle data={{ title: heading_text }} />
            <div className="page-contents-wrapper">
                <div className="page-contents-container" >
                    <ContractorForm data={formData}/>
                </div>
            </div>
        </div>
    );
};

export default ContractorPage;