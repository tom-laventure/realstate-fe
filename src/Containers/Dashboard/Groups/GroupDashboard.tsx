import React from 'react';
import classes from './GroupDashboard.module.scss'
import useFetchGroups from 'Store/Hooks/Groups/useFetchGroups';
import GroupsDashboard from 'Components/Table/Groups/GroupsTable';
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