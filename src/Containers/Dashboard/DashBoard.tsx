import React, { useEffect, useState } from 'react';
import classes from './DashBoard.module.scss'
import { useQueryClient } from '@tanstack/react-query';
import useFetchGroups from 'Store/Hooks/Groups/useFetchGroups';

const Dashboard = () => {
	const queryClient = useQueryClient()
	const [isLoading, data, isSuccess] = useFetchGroups()

	return (
		<div className={classes.dashboard}>

		</div>
	);

}



export default Dashboard;