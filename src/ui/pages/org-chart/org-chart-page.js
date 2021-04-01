import React, {useEffect, useRef, useState} from "react";
import PageHeader from "../../components/header";
import ProfileCardLarge from "../../components/profile-card-large";
import ProfileAccordion from "../../components/profile-accordion";
import Footer from "../../components/footer/footer";
import {getProfileResults} from "../../../services/profile";
import {useParams} from "react-router-dom";
import OrgChart from "../../components/org-chart";
import {getOrgChartResults} from "../../../services/org-chart";
import './org-chart-page.css';
import ScrollContainer from 'react-indiana-drag-scroll'
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import ClearIcon from "@material-ui/icons/Clear";
import {Button} from "@material-ui/core";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ReactDOM from "react-dom";
import storage from "../../../services/storage";

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

    const container = useRef(null);

    useEffect(() => {
        container.current.getElement().scrollTo(3100, 1100);
    }, []);

    return (
        <div className={"page-wrapper"}>
            <PageHeader />
            <TransformWrapper
                defaultScale={0.8}
                defaultPositionX={0}
                defaultPositionY={100}
                zoomOut={{
                    step: 10,
                }}
                zoomIn={{
                    step: 10
                }}
                options={{
                    limitToBounds: false,
                    minScale: 0.3,
                    maxScale: 2
                }}
                wheel={{
                    disabled: true
                }}
                pan={{
                    disabled: true
                }}

            >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <React.Fragment>
                        <div className="page-title-wrapper">
                            <div className="page-title-box">
                                <div className="page-title">
                                    <div className={"title"}> {heading_text} </div>
                                    <div className={"zoom-icons"} >
                                        <Button className={"icon-button"} onClick={zoomOut} ><ZoomOutIcon/></Button>
                                        <Button className={"icon-button"} onClick={zoomIn} ><ZoomInIcon/></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ScrollContainer className={"container"} ref={container}>
                        <TransformComponent >

                                <div className={"orgchart-wrapper"} id={"orgchart-wrapper"}>
                                    <OrgChart data={orgChartResults}/>
                                </div>
                        </TransformComponent>
                            </ScrollContainer>



                    </React.Fragment>
                )}
            </TransformWrapper>

            <Footer />
        </div>
    );
};

export default OrgChartPage;
