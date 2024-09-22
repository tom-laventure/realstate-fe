import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.scss'

const Home = () => {

	return (
		<div className={styles.container}>
			<div className={styles.userEvents}>
				<div className={styles['userEvents--header']}>
			</div>
				<div className={styles['userEvents--body']}>
				</div>
			</div>
		</div>
	)
}

export default Home
