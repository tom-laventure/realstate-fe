import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../Store/Hooks/useDispatch'
import useFetchUserEvents from '../../Store/Hooks/useFetchUserEvents'
import styles from './Home.module.scss'

const Home = () => {
	const { userId } = useAppSelector(state => state.account)
	const [isLoading, data] = useFetchUserEvents(userId)
	const { result } = data.data

	return (
		<div className={styles.container}>
			<div className={styles.userEvents}>
				<div className={styles['userEvents--header']}>
					Your Events
				</div>
				<div className={styles['userEvents--body']}>
					<UserEventsList />
				</div>
			</div>
		</div>
	)

	function UserEventsList() {
		if (isLoading) return <></>

		return <>
			{
				result.map((el, id) => {
					return <Link to={`/dashboard/${el.eventId}`} key={id}>
						<div className={styles['userEvents--body__item']} >
							<div>{el.eventName}</div>

						</div>
					</Link>
				})
}
		</>
	}
}

export default Home
