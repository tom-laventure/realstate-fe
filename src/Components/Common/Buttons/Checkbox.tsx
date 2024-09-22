import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@mui/material';

interface propType {
	label: string,
	click: () => void
}


const FormCheckbox = ({label, click}: propType) => {
	return (
		<FormControlLabel 
			onChange={click}
			control={
				<Checkbox
					className="mx-2"
					name={label} 
					id={label}
				/>
			}
			label={label}
		/>    
	);
}

FormCheckbox.propTypes = {
	label: PropTypes.string,
	click: PropTypes.func
}
 
export default FormCheckbox;