import React from "react";
import { Chart } from "react-google-charts";
import profile from '../../../assets/profile.jpg';
import {useParams} from "react-router-dom";



const OrgChart = (props) => {
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
        let link = "http://localhost:3000/orgchart/" + employeeNumber.toString()
        console.log(link)
        let nodeHtml =
                        '<div class="container">' +
                            '<img class="avatar" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="Avatar" height="50" width="50" /> <br />'  +
                            '<a class="link-wrapper" href='+link+' style="text-decoration:none;">' +
                                '<p class="employeeName">' + employeeName + '</p>' +
                            '</a>' +
                        '</div>'

        if (Number(employeeNumber) === Number(id)) {
            selectedEmployeeCount = employeeCounter
            nodeHtml =  '<div class="selectedEmployeeContainer">' +
                            '<img class="avatar" src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="Avatar" height="50" width="50" /> <br />'  +
                            '<a class="link-wrapper" href='+link+' style="text-decoration:none;">' +
                                '<p class="employeeName">' + employeeName + '</p>' +
                            '</a>' +
                        '</div>'
        }
        console.log("--------------------------")
        let employeeElement = [{
            v: employeeNumber.toString(),
            f:  nodeHtml

        },
            employee.superiorID.toString(),
            employeeName
        ]
        data.push(employeeElement)
    })
    console.log(data)

    // const handleCardOnClick = async () => {
    //     history.push(`/orgchart/${props.data.employeeNumber}`);
    //     window.location.reload();
    // };

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
                selectionColor: "#cae0ef",
                size: "small",
            }}
            rootProps={{ 'data-testid': '1' }}

        />

    );
};

export default OrgChart;
