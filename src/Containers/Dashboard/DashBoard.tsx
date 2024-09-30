import React, { useEffect, useState } from 'react';
import classes from './DashBoard.module.scss'
import useFetchGroups from 'Store/Hooks/Groups/useFetchGroups';
import GroupsDashboard from 'Components/DashBoard/Groups/GroupsDashboard';
import { useAppSelector } from 'Store/Hooks/useDispatch';

const Dashboard = () => {
	const { isLoading } = useFetchGroups()
	const groups = useAppSelector(state => state.groups.userGroups)
	return (
		<div className={classes['dashboard']}>
			<GroupsDashboard groups={groups} />
		</div>
	);

}



export default Dashboard;