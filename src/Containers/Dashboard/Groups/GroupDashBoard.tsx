import React from 'react';
import classes from './GroupDashBoard.module.scss'
import useFetchGroups from 'Store/Hooks/Groups/useFetchGroups';
import GroupsDashboard from 'Components/Table/Groups/GroupsTable';
import { useAppSelector } from 'Store/Hooks/useDispatch';
import { Button } from '@mui/material';

const Dashboard = () => {
	const { isLoading } = useFetchGroups()
	
	const groups = useAppSelector(state => state.groups.userGroups)
	
	const createGroup = () => {

	}

	return (
		<div className={classes['dashboard']}>
			<Button onClick={() => createGroup()}/>
			<GroupsDashboard groups={groups} />
		</div>
	);

}



export default Dashboard;