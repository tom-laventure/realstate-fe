import React from 'react'
import { Link } from 'react-router-dom'
import AppButton from '../Common/Buttons/AppButton'
import classes from './Navbar.module.scss'
import useSignOut from 'Store/Hooks/Auth/useSignOut'



const Navbar = () => {
	const { mutate: signout } = useSignOut()


	return (
		<div className={classes.navbar}>
			<div className={classes['navbar__buttons']}>
				<Link to="/">
					<AppButton>Home</AppButton>
				</Link>
			</div>
			<div className={classes['navbar__buttons']}>
				<Link to="/account">
					<AppButton>Account</AppButton>
				</Link>
				<AppButton click={() => signout()}>{'Sign Out'}</AppButton>
			</div>
		</div>
	)
}

export default Navbar
