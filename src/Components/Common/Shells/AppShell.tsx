import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../Footer/Footer';
import Navbar from '../../Navbar/NavBar';
import classes from './AppShell.module.scss'
import { Auth, Hub } from 'aws-amplify';
import { stateType } from '../../../Store/Reducers';
import { useAppDispatch, useAppSelector } from '../../../Store/Hooks/useDispatch';
import { updateUser } from '../../../Store/Reducers/account';

const AppShell = () => {
	const userId = useAppSelector((state) => state.account.userId)

	const dispatch = useAppDispatch()

	useEffect(() => {
		let update = async () => {
			try {
				let user = await Auth.currentAuthenticatedUser()
				const { sub, name } = user.attributes
				dispatch(updateUser({userId: sub, name: name}))
			} catch {
				dispatch(updateUser({userId: '', name: ''}))
			}
		}
		const cancelListener = Hub.listen('auth', update)
		update()
		return () => cancelListener()
	}, [])

	return ( 
		<div className={classes['app-shell']}>
			<Navbar />
			<div className={classes['app-shell__outlet']}>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
 
export default AppShell;