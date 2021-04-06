import React, {useEffect, useState} from "react";
import { Chart } from "react-google-charts";
import profile from '../../../assets/profile.jpg';
import {useParams} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import * as fs from "fs";
import storage from "../../../services/storage";


const OrgChart = (props) => {
    const [groups, setGroups] = useState([])
    const [offices, setOffices] = useState([])
    let linkBase = window.location.origin
    let managerEmployeeId;
    let { id } = useParams(); // dynamic part of url, in this case, employeeNumber
    let data = [['Name', 'Manager', 'ToolTip']]
    let employeeCounter = 0;
    let selectedEmployeeCount;
    useEffect(async () => {
        storage.db.searchDocument('metadata', {call_name: "Group"}).then((res) => {
            console.log(res)
            setGroups(res)
        })
    }, [])

    useEffect(async () => {
        storage.db.searchDocument('metadata', {call_name: "Office"}).then((res) => {
            console.log(res)
            setOffices(res)
        })
    }, [])

    function setParentNodes(employeeLevel, employeeNumber, employee) {
        if (employeeLevel === 0) {
            managerEmployeeId = employeeNumber
            employee.superiorID = ''
        } else if (employeeLevel === 1) {
            employee.superiorID = managerEmployeeId
        } else if (employeeLevel === 2) {
            employee.superiorID = id
        }
    }

    function createContractorBadge(employee) {
        let contractorBadgeHtml = ''

        if (employee.isContractor) {
            contractorBadgeHtml = '<span class="contractor-badge-span">' +
                '<div class="contractor-badge">C</div>' +
                '</span>'
        }
        return contractorBadgeHtml;
    }

    function createImageHtml(imageUrl, employee, employeeName) {
        let imageHtml = '<img class="avatar" src="' + imageUrl + '" width="54" height="54" /> '

        if (employee.photoUrl === null) {
            imageHtml = '<div class="backup-image">' + employeeName[0] + '</div>'
        }
        return imageHtml;
    }

    function createOrgChartLinkHtml(employeeNumber) {
        let orgChartLink = linkBase + "/orgchart/" + employeeNumber.toString()
        let orgChartLinkHtml = '<a class="link-wrapper" href=' + orgChartLink + '> ' +
            '<span class="material-icons">group_work</span>' +
            '</a>'
        return orgChartLinkHtml;
    }

    props.data.forEach((employee) => {
        let employeeNumber = employee.employeeNumber
        let employeeLevel = employee.level
        let employeeName = employee.firstName + " " + employee.lastName
        let title = employee.title
        if (title === null) {
            title = ""
        }
        let email = employee.email
        if (email === null) {
            email = ""
        }
        let imageUrl = "/api/photos/"+ employeeNumber
        let backupImageUrl = "https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg";
        let group = ""
        let office = ""
        if (employee.companyCode !== null) {
            groups.forEach((indexedDBGroup) => {
                if (employee.companyCode === indexedDBGroup.value_id[0] && employee.officeCode === indexedDBGroup.value_id[1] && employee.groupCode === indexedDBGroup.value_id[2]) {
                    group = indexedDBGroup.value_name
                }
            })
        }

        if (employee.officeCode !== null) {
            offices.forEach((indexedDBOffice) => {
                if (employee.companyCode === indexedDBOffice.value_id[0] && employee.officeCode === indexedDBOffice.value_id[1]) {
                    office = "("+indexedDBOffice.value_name+")"
                }
            })
        }

        let groupAndOffice = group + " " + office
        setParentNodes(employeeLevel, employeeNumber, employee);
        let contractorBadgeHtml = createContractorBadge(employee);
        let orgChartLinkHtml = createOrgChartLinkHtml(employeeNumber);
        let containerClassName = 'node-container'
        let addIfSelectedEmployee = ''
        if (Number(employeeNumber) === Number(id)) {
            orgChartLinkHtml = '<br /><br /><br />'
            containerClassName = 'selectedEmployeeContainer" id="selectedEmployeeContainer'
            addIfSelectedEmployee = '<br/><br/><br/>'
        }
        let imageHtml = createImageHtml(imageUrl, employee, employeeName);

        let profilePageLink = linkBase + "/profile/" + employeeNumber.toString()

        let nodeHtml =
                    '<div class="' + containerClassName + '">' +
                    '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">' +
                    ''+ addIfSelectedEmployee +
                        '<span class="avatar-image-wrapper">' +
                            '<span class="image-wrapper-div">' +
                                imageHtml +
                            '</span>' +
                             contractorBadgeHtml +
                        '</span>' +

                        '<p class="employeeName">' + employeeName + '</p>' +
                        '<p class="employeeTitle"> '+ title +' </p>' +
                        '<p class="employee-text">' + groupAndOffice + '</p>' +
                        '<a class="email-text" href="mailto:'+email+'">'+ email +'</a>' +
                        '<div class="link-div-wrapper">' +
                            '<a class="link-wrapper" href='+profilePageLink+'>' +
                                '<span class="material-icons">account_circle</span>' +
                            '</a>' +
                            orgChartLinkHtml +
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
            height={1000}
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
