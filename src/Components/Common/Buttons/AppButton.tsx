import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

type AppButtonProps  = {
	children: string,
	variant?: string | undefined,
	click?: () => void,
	underlined?: boolean
}

const AppButton = ({ children, variant, click }: AppButtonProps) => {
	return (
		<Button
			onClick={click}
			variant={variant as any}
			className="z-0"
		>
			{children}
		</Button>
	)
}

AppButton.propTypes = {
	children: PropTypes.string.isRequired,
	variant: PropTypes.string,
	click: PropTypes.func
}

export default AppButton
