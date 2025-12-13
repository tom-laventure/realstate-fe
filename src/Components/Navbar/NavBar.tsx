import React from 'react'
import classes from './Navbar.module.scss'
import { Button } from '@mui/material'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import useGetCurrentUser from 'Store/Hooks/Auth/useGetCurrentUser'
import { useCognitoAuth } from 'Store/Hooks/Auth/useCognitoAuth'
import { NavLink } from 'react-router-dom'

interface NavBarProps {
	disableAuth?: boolean
}

const Navbar = ({ disableAuth = false }: NavBarProps) => {
	const { signOut } = useCognitoAuth()

	if (!disableAuth) useGetCurrentUser()

	const handleSignOut = async () => {
		await signOut()
	}

	return (
		<div className={classes['navbar']}>
			<div className={classes['navbar__buttons']}>
				Placeholder
			</div>
			<div className={classes['navbar__buttons']}>
				<NavLink to="/">Groups</NavLink>
				<Button onClick={handleSignOut}>Sign Out</Button>
			</div>
		</div>
	)
}

export default Navbar
