import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Navbar.module.scss'
import useSignOut from 'Store/Hooks/Auth/useSignOut'
import { Button } from '@mui/material'



const Navbar = () => {
	const { mutate: signout } = useSignOut()


	return (
		<div className={classes.navbar}>
			<div className={classes['navbar__buttons']}>
				<Link to="/">
					<Button>Home</Button>
				</Link>
			</div>
			<div className={classes['navbar__buttons']}>
				<Button onClick={() => signout()}>Sign Out</Button>
			</div>
		</div>
	)
}

export default Navbar
