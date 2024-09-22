import { useAuthenticator } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import { person } from '../../../Assets/Types/EventTypes';
import AppFrame from '../../Common/Frames/AppFrame';
import classes from './AttendanceList.module.scss'
import AttendanceListItem from './AttendanceListItem/AttendanceListItem';

interface attendancePropTypes {
	attendance: person[] | []
}

const AttendanceList = ({ attendance }: attendancePropTypes) => {

	return (
		<AppFrame>
			<div className={classes['attendance-list']}>
				{attendance?.map((person, i) => {
					return <AttendanceListItem key={i} {...person} />
				})}
			</div>
		</AppFrame>
	);
}

export default AttendanceList;