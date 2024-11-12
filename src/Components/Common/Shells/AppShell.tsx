import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/NavBar';
import classes from './AppShell.module.scss'
import { useAppDispatch, useAppSelector } from '../../../Store/Hooks/useDispatch';


const AppShell = () => {
	const dispatch = useAppDispatch()

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