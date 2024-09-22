import React from 'react'
import CreateEventForm from '../../Components/Common/Form/CreateEvent/CreateEvent'
import classes from './CreateEvent.module.scss'

const CreateEvent = () => {
	return (
		<div className={classes['create-event']}>
			<CreateEventForm/>
		</div>
	)
}

export default CreateEvent
