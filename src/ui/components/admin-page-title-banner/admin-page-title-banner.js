import React from "react";
import "../page-title-banner/page-title-banner.css";
import "./admin-page-title-banner.css"
import {Button} from "@material-ui/core";
import jwtManager from "../../../services/jwt-manager"
import {useHistory} from "react-router";


const AdminTitle = (props) => {
    const history = useHistory()
    const handleClick = (e) => {
        jwtManager.resetToken();
        history.push(`/`);
        window.location.reload();
    }

    return (
        <div className="page-title-wrapper">
            <div className="page-title-box">
                <div className="page-title">{props.data.title}</div>
                <div className="logout-button">
                    <Button
                        className="add-contractor-button"
                        variant={"contained"}
                        size={"large"}
                        onClick={handleClick}
                        text={"Add A Contractor"}>
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AdminTitle;
