import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chart } from "react-google-charts";
import ProfileCard from "../profile-card";
import profile from '../../../assets/profile.jpg';
import {useParams} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
}));



const OrgChart = (props) => {
    const classes = useStyles();
    let managerEmployeeId;
    let { id } = useParams(); // dynamic part of url, in this case, employeeNumber
    let data = [['Name', 'Manager', 'ToolTip']]
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
        let employeeElement = [{
            v: employeeNumber.toString(),
            f: employeeName
        },
            employee.superiorID.toString(),
            employeeName
        ]
        data.push(employeeElement)
    })
    console.log(data)



    return (
        <Chart
            width={'100%'}
            height={1000} // <- not sure what height does...
            chartType="OrgChart"
            loader={<div>Loading Chart</div>}
            data={
                data
                // [
                //     {
                //         v: 'Mike',
                //         f: 'Mike <div style="color:red; font-style:italic">President</div>',
                //     },
                //     '',
                //     'The President',
                // ],
                // [
                //     // in the first {}, put 1) the node's ID
                //     //                      2) the information inside of it
                //     {
                //         v: 'Jim',
                //         f:  '<style> ' +

            }
            options={{
                allowHtml: true,
                allowCollapse: true
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
};

export default OrgChart;


//                 '.grid_items {' +
//                     'padding: 3.75%; ' +
//                     'display: grid; ' +
//                     'grid-template-columns: 30% 70%;' +
//                     'grid-column-gap: 5%; ' +
//                 '}' +
//                 '.grid_item {' +
//                     'color: white; ' +
//                     'background-color: grey; ' +
//                     'padding: 5%; ' +
//                 '}' +
//             '</style>' +
//             '<div class="grid_items">' +
//                 '<div class="grid_item">' +
//                     '<img src="../../../assets/profile.jpg"  alt="E"/> ' +
//                 '</div>' +
//                 '<div class="grid_item">C  <br>Lorem ipsum dolor sit amet. <br>Consectetuer adipiscing elit.</div>' +
//             '</div>'















// '<b>Child Node</b> <img src="http://www.mapsysinc.com/wp-content/uploads/2013/08/oracle-logo.gif" height="42" width="50"> </img>',
//     '<style> ' +
//         '.MuiGrid-container {' +
//             'width: 100%;' +
//             'display: flex;' +
//             'flex-wrap: wrap;' +
//             'box-sizing: border-box;' +
//         '} ' +
//         '.MuiCardActionArea-root {' +
//             'width: 100%;' +
//             'display: block;' +
//             'text-align: inherit;' +
//         '} .MuiButtonBase-root {' +
//             'color: inherit;' +
//     'border: 0;' +
//     'cursor: pointer;' +
//     'margin: 0;' +
//     'display: inline-flex;' +
//     'outline: 0;' +
//     'padding: 0;' +
//     'position: relative;' +
//     'align-items: center;' +
//     'user-select: none;' +
//     'border-radius: 0;' +
//     'vertical-align: middle;' +
//     '-moz-appearance: none;' +
//     'justify-content: center;' +
//     'text-decoration: none;' +
//     'background-color: transparent;' +
//     '-webkit-appearance: none;' +
//     '-webkit-tap-highlight-color: transparent;' +
//     '}' +
//     'user agent stylesheet' +
//     'button {' +
//     'appearance: auto;' +
//     '-webkit-writing-mode: horizontal-tb !important;' +
//     'text-rendering: auto;' +
//     'color: -internal-light-dark(black, white);' +
//     'letter-spacing: normal;' +
//     'word-spacing: normal;' +
//     'text-transform: none;' +
//     'text-indent: 0px;' +
//     'text-shadow: none;' +
//     'display: inline-block;' +
//     'text-align: center;' +
//     'align-items: flex-start;' +
//     'cursor: default;' +
//     'background-color: -internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));' +
//     'box-sizing: border-box;' +
//     'margin: 0em;' +
//     'font: 400 13.3333px Arial;' +
//     'padding: 1px 6px;' +
//     'border-width: 2px;' +
//     'border-style: outset;' +
//     'border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));' +
//     'border-image: initial;' +
//     '}' +
//     '.MuiPaper-root {' +
//     'color: rgba(0, 0, 0, 0.87);' +
//     'transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;' +
//     'background-color: #fff;' +
//     '}' +
//     'body {' +
//     'margin: 0;' +
//     'font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif; ' +
//     '-webkit-font-smoothing: antialiased;' +
//     '-moz-osx-font-smoothing: grayscale;' +
//     '}' +
//     '</style>' +
//     '<div className="MuiGrid-root MuiGrid-container">' +
//         '<div' +
//             'className="MuiGrid-root MuiGrid-container MuiGrid-item MuiGrid-align-items-xs-center MuiGrid-justify-xs-center MuiGrid-grid-xs-4"' +
//             'paddingright="0"' +
//         '>' +
//         '<div className="MuiAvatar-root MuiAvatar-circle makeStyles-profilePic-55" pr="0">' +
//             '<img' +
//                 'alt="Jill Johnson' +
//                 '"src="data:image/jpeg;base64,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"' +
//                 'className="MuiAvatar-img" ' +
//             '/>' +
//         '</div>' +
//     '</div>' +
//     '<div className="MuiGrid-root MuiGrid-container MuiGrid-item MuiGrid-grid-xs-8">' +
//         '<div className="makeStyles-details-51">' +
//             '<div className="MuiCardContent-root" padding="0">' +
//                 '<p className="MuiTypography-root WithStyles(ForwardRef(Typography))-root-57 MuiTypography-body1 MuiTypography-alignLeft">' +
//                     'Jill Johnson' +
//                 '</p>' +
//                 '<p className="MuiTypography-root WithStyles(ForwardRef(Typography))-root-58 MuiTypography-body1 MuiTypography-alignLeft">' +
//                     'COO' +
//                 '</p>' +
//                 '<p className="MuiTypography-root WithStyles(ForwardRef(Typography))-root-59 MuiTypography-body1 MuiTypography-alignLeft">' +
//                     'Group:  &amp; Office: ' +
//                 '</p>' +
//                 '</div>' +
//             '</div>' +
//         '</div>' +
//     '</div>'
// next try!!
//
// '<div>'+
//     '<div >' +
//         '<img ' +
//             'alt="Jill Johnson"' +
//             'src="data:image/jpeg;base64,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"' +
//             'className="MuiAvatar-img" />' +
//     '</div>' +
// '</div>' +
// '<div >' +
//     '<div >' +
//         '<div >' +
//             '<p >' +
//                 'Jill Johnson' +
//             '</p>' +
//             '<p >' +
//                 'COO' +
//             '</p>' +
//             '<p >' +
//                 'Group:  &amp; Office:' +
//             '</p>' +
//         '</div>' +
//     '</div>' +
// '</div>' +
// '</div>'

//     },
//     // 'Mike' is the ID of Jim's manager
//     'Mike',
//
//     // 'VP' is the ToolTip (IE, it's useless!)
//     'VP',
// ],