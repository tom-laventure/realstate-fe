import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Navbar/NavBar';
import classes from './AppShell.module.scss'
import GroupSideNav from 'Components/Navbar/SideNav/GroupSideNav/GroupSideNav';


const AppShell = () => {
	useEffect(() => {

	}, [])

	return (
		<div className={classes['app-shell']}>
			<Navbar />
			<div className={classes['app-shell__outlet']}>
				<GroupSideNav />
				<Outlet />
			</div>
		</div>
	);
}

export default AppShell;