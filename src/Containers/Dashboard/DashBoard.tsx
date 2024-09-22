import React, { useEffect, useState } from 'react';
import classes from './DashBoard.module.scss'
import { useQueryClient } from '@tanstack/react-query';

const Dashboard = () => {
	const queryClient = useQueryClient()


	return (
		<div className={classes.dashboard}>
			
		</div>
	);

}



export default Dashboard;