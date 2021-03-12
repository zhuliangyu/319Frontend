import React, {useEffect, useState} from "react";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import filters from "../../../services/filters";

import {
    TextField,
    Paper,
    Grid,
    Button,
    InputAdornment
} from '@material-ui/core';
import DropDown from "./dropdown";
import {
    getCompaniesFromFilters,
    getGroupsFromLocation,
    getLocationsFromFilters,
    getOfficesFromCompany
} from "../../../services/filterUtil";

const useForm = (initialFValues, validateOnChange = false, validate) => {


    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

const ContractorForm = (props) => {
    const formTitle = "Add a contractor";
    const [selectionFilters, setSelectionFilters] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [offices, setOffices] = useState([{value_id: -1, value_name: "Please select a Company"}]);
    const [groups, setGroups] = useState([{value_id: -1, value_name: "Please select an Office"}]);
    const [locations, setLocations] = useState([])

    useEffect(() => {
        filters.getFilterList("Selection").then(filters => {
            // console.log(filters);
            setSelectionFilters(filters)
            setCompanies(getCompaniesFromFilters(filters));
            setLocations(getLocationsFromFilters(filters));
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const handleHierarchyChange = e => {
        const { name, value } = e.target
        console.log(name)
        console.log(value)
        switch (name) {
            case "companyCode":
                setOffices(getOfficesFromCompany(selectionFilters, value));
                break;
            case "officeCode":
                setGroups(getGroupsFromLocation(selectionFilters, value));
                break;
            default:
                break;
        }

        setValues({
            ...values,
            [name]: value
        })
    }

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

    // TODO
    // required fields: lastName, firstName, companyCode, OfficeCode, groupCode, supervisorEmpNo
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length !== 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            console.log("form submission")
            resetForm()
        }
    }

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
                            // error={errors.groupCode}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DropDown
                            name="location"
                            label="Physical Location"
                            value={values.locationId.value_name}
                            onChange={handleInputChange}
                            options={locations}
                            // error={errors.groupCode}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth={true}
                            label="Email Address"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth={true}
                            label="Work phone"
                            name="workPhone"
                            value={values.workPhone}
                            onChange={handleInputChange}
                            helperText="Format: xxx-xxx-xxxx"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth={true}
                            label="Work cell"
                            name="workCell"
                            value={values.workCell}
                            onChange={handleInputChange}
                            helperText="Format: xxx-xxx-xxxx"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth={true}
                            required
                            label="Supervisor Employee No."
                            name="supervisorEmployeeNumber"
                            value={values.supervisorEmployeeNumber}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            fullWidth={true}
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