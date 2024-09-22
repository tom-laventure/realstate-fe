import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import classes from './Frames.module.scss'

interface frameProps {
	children: ReactNode
}

const AppFrame = ({children}: frameProps) => {
	return (
		<div className={classes['app-frame']}>
			{children}
		</div>
	);
}

AppFrame.propTypes = {
	children: PropTypes.element
}
 
export default AppFrame; 