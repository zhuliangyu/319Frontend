import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

const DropDown = (props) => {

    const { name, label, placeHolder, value,error=null, onChange, options, disabled } = props;

    return (
        <FormControl
            required
                     fullWidth={true}
                     defaultValue=""
                     {...(error && {error:true})}>
            <InputLabel shrink>{label}</InputLabel>
            <MuiSelect
                disabled={disabled}
                displayEmpty={true}
                fullWidth={true}
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                {/*<option aria-label="None" value=""/>*/}
                <MenuItem value=""> {placeHolder}
                </MenuItem>
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

