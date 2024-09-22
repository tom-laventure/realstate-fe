import React from 'react';
import PropTypes from 'prop-types';
import classes from './Labels.module.scss'

interface formLabelProps {
	children: string
}

const FormLabel = ({children}: formLabelProps) => {
	return (
		<div className={classes['form-labels']}>{children}</div>
	);
}

FormLabel.propTypes = {
	children: PropTypes.string
}
 
export default FormLabel;