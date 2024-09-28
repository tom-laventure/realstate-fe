import React, { useEffect, useState } from 'react';
import classes from './DashBoard.module.scss'
import useFetchGroups from 'Store/Hooks/Groups/useFetchGroups';
import GroupsDashboard from 'Components/DashBoard/Groups/GroupsDashboard';

const Dashboard = () => {
	const [isLoading] = useFetchGroups()

	return (
		<div className={classes.dashboard}>
			<GroupsDashboard />
		</div>
	);

}



export default Dashboard;