import React from "react";
import { Chart } from "react-google-charts";
import profile from '../../../assets/profile.jpg';
import {useParams} from "react-router-dom";



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
        if (employeeLevel === 0) {
            managerEmployeeId = employeeNumber
            employee.superiorID = ''
        } else if (employeeLevel === 1) {
            employee.superiorID = managerEmployeeId
        } else if (employeeLevel === 2) {
            employee.superiorID = id
        }


        let orgChartLink = linkBase + "/orgchart/" + employeeNumber.toString()
        let profilePageLink = linkBase + "/profile/" + employeeNumber.toString()
        let nodeHtml =
                    '<div class="container">' +
                        '<img class="avatar" src="https://www.pngkey.com/png/detail/202-2024691_my-profile-comments-my-profile-icon-png.png" alt="Avatar" height="50" width="50" /> <br />'  +
                        '<p class="employeeName">' + employeeName + '</p>' +
                        '<p class="employeeTitle"> Employee Title </p>' +
                        '<a class="link-wrapper" href='+profilePageLink+'> ' +
                            'View Profile →' +
                        '</a>' +
                        '<a class="link-wrapper" href='+orgChartLink+'> ' +
                            'View Org Chart →' +
                        '</a>' +
                    '</div>'

        if (Number(employeeNumber) === Number(id)) {
            selectedEmployeeCount = employeeCounter
            nodeHtml =
                '<div class="selectedEmployeeContainer">' +
                    '<img class="avatar" src="https://www.pngkey.com/png/detail/202-2024691_my-profile-comments-my-profile-icon-png.png" alt="Avatar" height="50" width="50" /> <br />'  +
                    '<p class="employeeName">' + employeeName + '</p>' +
                    '<p class="employeeTitle"> Employee Title </p>' +
                    '<a class="link-wrapper" href=' + profilePageLink +'>' +
                        'View Profile →' +
                    '</a>' +
                '<br/>' +
                    '<a class="link-wrapper" href=' + profilePageLink +'>' +
                    '' +
                    '</a>' +
                '</div>'
        }
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
