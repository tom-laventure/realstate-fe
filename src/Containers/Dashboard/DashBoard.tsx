import React, { useEffect, useState } from 'react';
import classes from './DashBoard.module.scss'
import AppButton from '../../Components/Common/Buttons/AppButton';
import { useParams } from 'react-router-dom';
import { event, person } from '../../Assets/Types/EventTypes';
import useFetchEvent from '../../Store/Hooks/useFetchEvent';
import { useRemoveAttendance, useAddAttendance } from '../../Store/Hooks/useChangeAttendance';
import { useAppSelector } from '../../Store/Hooks/useDispatch';
import { useQueryClient } from '@tanstack/react-query';

const Dashboard = () => {
	const [eventDetails, setEventDetails] = useState<event>({
		details: {
			eventId: '',
			eventName: '',
			eventDate: null,
			eventNotes: '',
		},
		attendance: []
	})

	const [inEvent, setInEvent] = useState(false)
	const { userId, name } = useAppSelector(state => state.account)
	const { id } = useParams()
	const [isLoading, data, isSuccess] = useFetchEvent(id)
	const [mutateRemoveUser] = useRemoveAttendance()
	const [mutateAddUser] = useAddAttendance()
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!isLoading && data !== undefined && isSuccess) {
			setEventDetails(data)
			if (data.attendance.find(el => el.userId === userId)) setInEvent(true)
		}
	}, [id, isSuccess])

	return (
		<div className={classes.dashboard}>
			{isLoading ? <div className={classes['dashboard__top-section--button-placeholder']} /> :
				<>
					<div className={classes['dashboard__top-section']}>
						<div className={classes['dashboard__top-section--buttons']}>
							<JoinDinnerButtons />
						</div>
						<MaxCapacity />
					</div>
					<div className={classes['dashboard__title']}>
						{eventDetails.details.eventName}
					</div>
					<div className={classes['dashboard__main']}>
					</div>
				</>}
		</div>
	);

	function changeAttendance() {
		if (inEvent) {
			mutateRemoveUser({ userId: userId, eventId: eventDetails.details.eventId }, {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['fetchEvent', id] })
					setEventDetails(state => {
						let res = { ...state }
						res.attendance = res.attendance.filter(el => el.userId !== userId)
						console.log(res.attendance)
						return res
					})
				}
			})
		} else {
			mutateAddUser({ userId: userId, eventId: eventDetails.details.eventId, username: name }, {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['fetchEvent', id] })
					setEventDetails(state => {
						let array: person[] = [...state.attendance]
						let newItem = { userId: userId, username: name } as person
						array.push(newItem)
						state.attendance = array
						return state
					})

				}
			})
		}
		setInEvent(inEvent => !inEvent)
	}

	function JoinDinnerButtons() {
		return <>
			{inEvent ? <AppButton click={changeAttendance}>Join Event</AppButton> : <>
				<AppButton click={changeAttendance}>Leave Event</AppButton>
				<AppButton>Add a Plus One</AppButton>
			</>}
		</>
	}

	function MaxCapacity() {
		if (!eventDetails.maxCapacity) return <></>
		return (
			<div className={classes['dashboard__top-section--capacity']}>
				Available Spaces: {eventDetails.maxCapacity}
			</div>
		)
	}
}



export default Dashboard;