import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Navbar/NavBar';
import classes from './AppShell.module.scss'


const AppShell = () => {
	useEffect(() => {

	}, [])

	return (
		<div className={classes['app-shell']}>
			<Navbar />
			<div className={classes['app-shell__outlet']}>
				<Outlet />
			</div>
		</div>
	);
}

export default AppShell;