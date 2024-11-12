import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import classes from './Navbar.module.scss'
import useSignOut from 'Store/Hooks/Auth/useSignOut'
import { Button } from '@mui/material'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import useGetCurrentUser from 'Store/Hooks/Auth/useGetCurrentUser'



const Navbar = () => {
	const { mutate: signout } = useSignOut()
	const accountId = useAppSelector(state => state.account.id)
	useGetCurrentUser(accountId)

	return (
		<div className={classes.navbar}>
			<div className={classes['navbar__buttons']}>
			</div>
			<div className={classes['navbar__buttons']}>
				<Button onClick={() => signout()}>Sign Out</Button>
			</div>
		</div>
	)
}

export default Navbar
