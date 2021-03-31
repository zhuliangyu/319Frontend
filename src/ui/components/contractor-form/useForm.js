import {useState} from "react";

/**
 * Hook used by contractor-form to handle changes, validation, and errors
 * @param initialFValues object containing the initial values of the form inputs
 * @param validateOnChange whether validateOnChange is required
 * @param validate function
 * @returns {{setValues: setValue function,
 *      values: current values of the form,
 *      resetForm: resetForm function,
 *      setErrors: setErrors function,
 *      errors: {} error object,
 *      handleInputChange: handleInputChange function}}
 */
export const useForm = (initialFValues, validateOnChange = false, validate) => {

    console.log(initialFValues);
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});
    console.log(values);

    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({[name]: value})
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