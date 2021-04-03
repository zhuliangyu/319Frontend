import React from "react";
import PageHeader from "../../components/header";
import PageTitle from "../../components/page-title-banner";
import "../page.css";
import ContractorForm from "../../components/contractor-form";
import AdminTitle from "../../components/admin-page-title-banner";

// stub
const ContractorAddPage = () => {
    const heading_text = "Contractor";
    let formData = {}

    return (
        <div>
            <PageHeader />
            <AdminTitle data={{ title: heading_text }} />
            <div className="page-contents-wrapper">
                <div className="page-contents-container" >
                    <ContractorForm data={formData}/>
                </div>
            </div>
        </div>
    );
};

export default ContractorAddPage;