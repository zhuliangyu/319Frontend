import React from 'react';
import {Button, Grid, Paper, TextField, Modal, makeStyles, Box} from '@material-ui/core';
import {useForm} from "../contractor-form/useForm";
import axios from 'axios';
import jwtManager from "../../../services/jwt-manager"
import {useHistory} from "react-router-dom";

import './login-form.css'

const LoginForm = (props) => {
    let history = useHistory();
    let initialFValues = {
        username : "",
        password : ""
    }

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('username' in fieldValues)
            temp.username = fieldValues.username ? "" : "This field is required."
        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."

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
    } = useForm(initialFValues, false, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            axios.post('/api/login',values)
                .then((response) => {
                    if (response.status === 200) {
                        jwtManager.setToken(response.data);
                        history.push(`/admin`);
                        window.location.reload();
                    } else {
                        alert("Login unsuccessful. Please try again")
                    }
                },
                (error) => {
                    alert("Login unsuccessful. Please try again")
                }
            );
        }
    }

    return(
        <div className="form-container">
            <form>
                <Grid container spacing={5} >
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth={true}
                            required
                            variant="outlined"
                            label="User name"
                            name="username"
                            value={values.username}
                            onChange={handleInputChange}
                            error =  {errors.username}
                            helperText={errors.username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth={true}
                            required
                            variant="outlined"
                            label="Password"
                            name="password"
                            type="password"
                            value={values.password}
                            onChange={handleInputChange}
                            error =  {errors.password}
                            helperText={errors.password}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant={"contained"}
                            size={"large"}
                            color={"primary"}
                            onClick={handleSubmit}
                            text={"Submit"}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default LoginForm