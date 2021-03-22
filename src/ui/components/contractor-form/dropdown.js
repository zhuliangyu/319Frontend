import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

const DropDown = (props) => {

    const { name, label, value,error=null, onChange, options } = props;

    return (
        <FormControl variant="outlined"
                     fullWidth={true}
                     {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect fullWidth={true}
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <option aria-label="None" value="" />
                {
                    options.map(
                        item => (<MenuItem key={item.value_id} value={item.value_id}>{item.value_name}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    );
}

export default DropDown;

