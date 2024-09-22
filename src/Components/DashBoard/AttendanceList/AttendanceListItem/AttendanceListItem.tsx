import React from 'react';
import AppButton from '../../../Common/Buttons/AppButton';
import classes from './AttendanceListItem.module.scss'
import PropTypes, { object } from 'prop-types'

interface AttendanceListItemProps {
	username: string,
	sharingDetails?: any
}

const AttendanceListItem = ({username, sharingDetails}: AttendanceListItemProps) => {
	
	return (
		<div className={classes['attendance-list-item']}>
			<div className={classes['attendance-list-item__profile-details']}>
				<img />
				<span>{username}</span>
			</div>
			<div className={classes['attendance-list-item__attendance-details']}>
				<div className={classes['attendance-list-item__sharing-details']}>
					<span>Pasta</span>
					<span>Main Course</span>
					 <span>10 Servings</span>
				</div>
				<AppButton underlined>Details</AppButton>
			</div>
		</div>
	);
}

AttendanceListItem.propTypes = {
	name: PropTypes.string,
	sharingDetails: PropTypes.object
}
 
export default AttendanceListItem;