import PropTypes from 'prop-types'
import React from 'react'

type option = {
	name: string
}

type options = {
	options: option[]
}


const Select = ({ options }: options) => {
	return (
		<select>
			{options?.map((item, index) => {
				return <option key={index}>{item.name}</option>
			})}
		</select>
	)
}

Select.propTypes = {
	options: PropTypes.array.isRequired
}

export default Select
