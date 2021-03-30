import React from "react";
import { Chart } from "react-google-charts";
import profile from '../../../assets/profile.jpg';
import {useParams} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import * as fs from "fs";


const OrgChart = (props) => {
    let linkBase = window.location.origin
    let managerEmployeeId;
    let { id } = useParams(); // dynamic part of url, in this case, employeeNumber
    let data = [['Name', 'Manager', 'ToolTip']]
    let employeeCounter = 0;
    let selectedEmployeeCount;
    props.data.forEach((employee) => {
        let employeeNumber = employee.employeeNumber
        let employeeLevel = employee.level
        let employeeName = employee.firstName + " " + employee.lastName
        let title = employee.title

        let imageUrl = "https://ae-demo.dhruv.tech/api/photos/"+ employeeNumber
        let backupImageUrl = "https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg";

        if (employeeLevel === 0) {
            managerEmployeeId = employeeNumber
            employee.superiorID = ''
        } else if (employeeLevel === 1) {
            employee.superiorID = managerEmployeeId
        } else if (employeeLevel === 2) {
            employee.superiorID = id
        }
        let isContractor = true
        let contractorBadgeHtml = ''

        if (isContractor) {
            contractorBadgeHtml =   '<span class="contractor-badge-span">' +
                '<div class="contractor-badge">C</div>' +
                '</span>'
        }

        let orgChartLink = linkBase + "/orgchart/" + employeeNumber.toString()
        let orgChartHtml =  '<a class="link-wrapper" href='+orgChartLink+'> ' +
                                '<span class="material-icons">group_work</span>' +
                            '</a>'
        let containerClassName = 'container'
        let addIfSelected = ''
        if (Number(employeeNumber) === Number(id)) {
            orgChartHtml = '<br /><br /><br />'
            containerClassName = 'selectedEmployeeContainer'
            addIfSelected = '<br/><br/><br/>'
        }

        let firstLetter = employeeName[0]
        let imageHtml = '<img class="avatar" src="'+imageUrl+'" width="54" height="54" /> '

        let hasImage = false
        if (hasImage) {
            imageHtml = '<div class="backup-image">'+firstLetter+'</div>'
        }

        let profilePageLink = linkBase + "/profile/" + employeeNumber.toString()

        let nodeHtml =
                    '<div class="' + containerClassName + '">' +
                    '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">' +
                    ''+ addIfSelected +
                        '<span class="avatar-image-wrapper">' +
                            '<span class="image-wrapper-div">' +
                                imageHtml +
                            '</span>' +
                             contractorBadgeHtml +
                        '</span>' +

                        '<p class="employeeName">' + employeeName + '</p>' +
                        '<p class="employeeTitle"> '+ title +' </p>' +
                        '<p class="employee-text">  Administration(Corporate)  </p>' +
                        '<a class="email-text" href="mailto:person@email.com">  person@email.com  </a>' +
                        '<div class="link-div-wrapper">' +
                            '<a class="link-wrapper" href='+profilePageLink+'>' +
                                '<span class="material-icons">account_circle</span>' +
                            '</a>' +
                            orgChartHtml +
                        '</div>' +
                    '</div>'


        let employeeElement = [{
            v: employeeNumber.toString(),
            f:  nodeHtml

        },
            employee.superiorID.toString(),
            employeeName
        ]
        data.push(employeeElement)
    })

    return (
        <Chart
            width={'100%'}
            height={1000} // <- not sure what height does...
            chartType="OrgChart"
            loader={<div class="loader"> </div>}
            data={
                data
            }
            options={{
                allowHtml: true,
                color: "#FFFFFF",
                selectionColor: "#FFFFFF",
                size: "small",
            }}
            rootProps={{ 'data-testid': '1' }}

        />

    );
};

export default OrgChart;
