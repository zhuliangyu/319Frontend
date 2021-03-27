import PageHeader from "../../components/header/header";
import PageTitle from "../../components/page-title-banner/page-title-banner";
import React from "react";
import LoginForm from "../../components/login-form";
import "../page.css";


const LoginPage = () => {
    const heading_text = "Administrative Section";

    return (
        <div>
            <PageHeader />
            <PageTitle data={{ title: heading_text }} />
            <div className="page-contents-wrapper">
                <div className="page-contents-container" >
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default LoginPage