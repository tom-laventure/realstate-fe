import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@mui/material'
import classes from './inputs.module.scss'

interface textPropTypes {
	label: string,
	onChange?: () => void,
	multiline?: boolean,
	minRows?: number,
	type?: string,
	helperText?: string,
	placeholder?: string,
	refValue?: React.Ref<HTMLInputElement>
}


const Text = ({
	label,
	onChange,
	multiline,
	minRows,
	type,
	helperText,
	placeholder,
	refValue
}: textPropTypes) => {
	return (
		<TextField 
			className={`${classes['text-field']}`}
			type={type}
			label={label} 
			onChange={onChange} 
			multiline={multiline}
			minRows={minRows}
			helperText={helperText}
			placeholder={placeholder}
			inputRef={refValue}
		/>
	)
}

Text.propTypes = {
	label: PropTypes.string,
	onChange: PropTypes.func,
	multiline: PropTypes.bool,
	minRows: PropTypes.number,
	type: PropTypes.string,
	helperText: PropTypes.string,
	placeholder: PropTypes.string
}

Text.defaultProps = {
	type: 'text',
}

export default Text
