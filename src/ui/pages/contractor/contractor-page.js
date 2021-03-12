import React from "react";
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import "../page.css";
import ContractorForm from "../../components/contractor-form";

const ContractorPage = () => {
    const heading_text = "Contractor";

    return (
        <div>
            <PageHeader />
            <PageTitle data={{ title: heading_text }} />
            <div className="page-contents-wrapper">
                <div className="page-contents-container" >
                    <ContractorForm />
                </div>
            </div>
        </div>
    );
};

export default ContractorPage;