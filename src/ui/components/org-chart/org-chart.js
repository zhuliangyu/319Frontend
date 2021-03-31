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

    props.data.forEach((employee) => {
        let employeeNumber = employee.employeeNumber
        let employeeLevel = employee.level
        let employeeName = employee.firstName + " " + employee.lastName
        let title = employee.title
        let email = employee.email
        let imageUrl = "https://ae-demo.dhruv.tech/api/photos/"+ employeeNumber
        let backupImageUrl = "https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg";
        let group = ""
        let office = ""
        console.log(employee)
        groups.forEach((indexedDBGroup) => {
            if (employee.companyCode === indexedDBGroup.value_id[0] && employee.officeCode === indexedDBGroup.value_id[1] && employee.groupCode === indexedDBGroup.value_id[2]) {
                group = indexedDBGroup.value_name
            }
        })
        console.log("TEST --------------------------------------------------------")
        console.log(offices)
        offices.forEach((off) => {

            console.log("inside!!!")

            if (employee.companyCode === off.value_id[0] && employee.officeCode === off.value_id[1]) {
                office = off.value_name
            }
        })
        let groupAndOffice = group + "(" + office + ")"



        if (employeeLevel === 0) {
            managerEmployeeId = employeeNumber
            employee.superiorID = ''
        } else if (employeeLevel === 1) {
            employee.superiorID = managerEmployeeId
        } else if (employeeLevel === 2) {
            employee.superiorID = id
        }

        let contractorBadgeHtml = ''

        if (employee.isContractor) {
            contractorBadgeHtml =   '<span class="contractor-badge-span">' +
                '<div class="contractor-badge">C</div>' +
                '</span>'
        }

        let orgChartLink = linkBase + "/orgchart/" + employeeNumber.toString()
        let orgChartHtml =  '<a class="link-wrapper" href='+orgChartLink+'> ' +
                                '<span class="material-icons">group_work</span>' +
                            '</a>'
        let containerClassName = 'node-container'
        let addIfSelected = ''
        if (Number(employeeNumber) === Number(id)) {
            orgChartHtml = '<br /><br /><br />'
            containerClassName = 'selectedEmployeeContainer'
            addIfSelected = '<br/><br/><br/>'
        }

        let firstLetter = employeeName[0]
        let imageHtml = '<img class="avatar" src="'+imageUrl+'" width="54" height="54" /> '

        if (employee.photoUrl === null) {
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
                        '<p class="employee-text">' + groupAndOffice + '</p>' +
                        '<a class="email-text" href="mailto:'+email+'">'+ email +'</a>' +
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
