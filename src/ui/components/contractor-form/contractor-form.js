import React, {useEffect, useState} from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import filters from "../../../services/filters";

import {Button, Grid, Paper, TextField} from '@material-ui/core';
import DropDown from "./dropdown";
import {useForm} from "./useForm";
import storage from "../../../services/storage";

const ContractorForm = (props) => {
    const formTitle = props.data.hasData ? "Edit Contractor" : "Add a contractor";
    const [selectionFilters, setSelectionFilters] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [offices, setOffices] = useState([{value_id: -1, value_name: "Please select a Company"}]);
    const [groups, setGroups] = useState([{value_id: -1, value_name: "Please select an Office"}]);
    const [locations, setLocations] = useState([])

    // set the initial companies and locations selections
    useEffect(async() => {

        setCompanies(await storage.db.searchDocument('metadata', {call_name: 'Company'}));
        setLocations(await storage.db.searchDocument('metadata', {call_name: 'Location'}));
        setSelectionFilters(await filters.getFilterList("Selection"));
    }, [])

    // initial form values
    // TODO: pass down from prop for edit
    let initialFValues = {
        lastName: '',
        firstName: '',
        companyCode: '',
        officeCode: '',
        groupCode: '',
        locationId: '',
        supervisorEmployeeNumber: '',
        employmentType: '',
        title: '',
        yearsPriorExperience: '',
        email: '',
        workPhone: '',
        workCell: '',
        hireDate: null,
        terminationDate: null,
        bio: '',
        extraInfo: '',
    }

    // validation logic
    const validate = (fieldValues = values) => {
        let fieldName = Object.keys(fieldValues)[0];
        let temp = { ...errors }

        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This field is required."
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "This field is required."
        if ('companyCode' in fieldValues)
            temp.companyCode = fieldValues.companyCode ? "" : "This field is required."
        if ('officeCode' in fieldValues)
            temp.officeCode = fieldValues.officeCode && fieldValues.officeCode !== -1 ? "" : "This field is required."
        if ('groupCode' in fieldValues)
            temp.groupCode = fieldValues.groupCode && fieldValues.groupCode !== -1 ? "" : "This field is required."
        if ('supervisorEmployeeNumber' in fieldValues)
            temp.supervisorEmployeeNumber = fieldValues.supervisorEmployeeNumber ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('workPhone' in fieldValues && fieldValues.workPhone !== "")
            temp.workPhone = (/^\d{3}\-\d{3}\-\d{4}$/).test(fieldValues.workPhone) ? "" : "Phone number is not valid."
        if ('workCell' in fieldValues && fieldValues.workCell !== "")
            temp.workCell = (/^\d{3}\-\d{3}\-\d{4}$/).test(fieldValues.workCell) && temp.workPhone !== "" ?
                "" : "Phone number is not valid."

        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    // get useForm hooks
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    // set lower hierarchy members' selection when a hierarchy member is changed
    const handleHierarchyChange = async(e) => {
        const { name, value } = e.target
        // console.log(name)
        // console.log(value)
        switch (name) {
            case "companyCode":
                setOffices(await filters.getChildFromAncestor("Office", value));
                break;
            case "officeCode":
                if (value !== -1) {
                    setGroups(await filters.getChildFromAncestor("Group", value));
                }
                break;
            default:
                break;
        }

        setValues({
            ...values,
            [name]: value
        })
    }

    // submit function
    // TODO
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            console.log("form submission")
            resetForm()
        }
    }

    // for date
    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <form onSubmit={handleSubmit}>
            <h2>{formTitle}</h2>
            <Paper style={{ padding: 16 }}>
                <Grid container spacing={5} >
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth={true}
                            required
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleInputChange}
                            error =  {errors.lastName}
                            helperText={errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth={true}
                            required
                            label="First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleInputChange}
                            error =  {errors.firstName}
                            helperText={errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DropDown
                            required
                            name="companyCode"
                            label="Company"
                            value={values.companyCode.value_name}
                            onChange={handleHierarchyChange}
                            options={companies}
                            error =  {errors.companyCode}
                            helperText={errors.companyCode}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DropDown
                            required
                            name="officeCode"
                            label="Office"
                            value={values.officeCode.value_name}
                            onChange={handleHierarchyChange}
                            options={offices}
                            error =  {errors.officeCode}
                            helperText={errors.officeCode}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DropDown
                            required
                            name="groupCode"
                            label="Group"
                            value={values.groupCode.value_name}
                            onChange={handleInputChange}
                            options={groups}
                            error =  {errors.groupCode}
                            helperText={errors.groupCode}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DropDown
                            name="location"
                            label="Physical Location"
                            value={values.locationId.value_name}
                            onChange={handleInputChange}
                            options={locations}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth={true}
                            label="Email Address"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            error =  {errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth={true}
                            label="Work phone"
                            name="workPhone"
                            value={values.workPhone}
                            onChange={handleInputChange}
                            error =  {errors.workPhone}
                            helperText={"Format: xxx-xxx-xxxx"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth={true}
                            label="Work cell"
                            name="workCell"
                            value={values.workCell}
                            onChange={handleInputChange}
                            error =  {errors.workCell}
                            helperText={"Format: xxx-xxx-xxxx"}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth={true}
                            required
                            type="number"
                            label="Supervisor Employee No."
                            name="supervisorEmployeeNumber"
                            value={values.supervisorEmployeeNumber}
                            onChange={handleInputChange}
                            error =  {errors.supervisorEmployeeNumber}
                            helperText={errors.supervisorEmployeeNumber}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth={true}
                            type="number"
                            label="Years of Prior Experience"
                            name="yearsPriorExperience"
                            value={values.yearsPriorExperience}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth={true}
                            label="Title"
                            name="title"
                            value={values.title}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth={true}
                            label="Employment Type"
                            name="employmentType"
                            value={values.employmentType}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                                                label="Hire Date"
                                                format="MMM/dd/yyyy"
                                                name="hireDate"
                                                value={values.hireDate}
                                                onChange={date =>handleInputChange(convertToDefEventPara('hireDate',date))}

                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                                                label="Termination Date"
                                                format="MMM/dd/yyyy"
                                                name="terminationDate"
                                                value={values.terminationDate}
                                                onChange={date =>handleInputChange(convertToDefEventPara('terminationDate',date))}

                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth={true}
                            name="bio"
                            label="Biography"
                            multiline
                            rows={2}
                            value={values.bio}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth={true}
                            name="extraInfo"
                            label="Exra Information"
                            multiline
                            rows={4}
                            value={values.extraInfo}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant={"contained"}
                            size={"large"}
                            color={"primary"}
                            onClick={handleSubmit}
                            text={"Submit"}>
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant={"contained"}
                            size={"large"}
                            color={"primary"}
                            onClick={resetForm}
                            text={"Reset"}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    );
};

export default ContractorForm