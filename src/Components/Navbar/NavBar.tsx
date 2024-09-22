import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppButton from '../Common/Buttons/AppButton'
import classes from './Navbar.module.scss'
import { useAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import { useAppSelector } from '../../Store/Hooks/useDispatch';


const Navbar = () => {
	const { signOut } = useAuthenticator((context) => [context.signOut])
	const {userId} = useAppSelector(state => state.account)
	const [displaySignIn, setDisplaySignIn] = useState(false)

	const changeAuthState = () => {
		if (userId) signOut()
		else setDisplaySignIn(!displaySignIn)
	}


	return (
		<div className={classes.navbar}>
			<div className={classes['navbar__buttons']}>
				<Link to="/">
					<AppButton>Home</AppButton>
				</Link>
			</div>
			<div className={classes['navbar__buttons']}>
				<Link to="/create-event">
					<AppButton>Create Event</AppButton>
				</Link>
				<Link to="/account">
					<AppButton>Account</AppButton>
				</Link>
				<AppButton click={changeAuthState}>{userId ? 'Sign Out' : 'Sign In'}</AppButton>
			</div>
			{displaySignIn ? <Authenticator variation='modal' signUpAttributes={['name']} /> : ''}
		</div>
	)
}

export default Navbar
