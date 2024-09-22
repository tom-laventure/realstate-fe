import dayjs from 'dayjs';
import React from 'react';
import { eventDetails } from '../../../Assets/Types/EventTypes';
import AppFrame from '../../Common/Frames/AppFrame';
import classes from './EventDetails.module.scss'

interface eventDetailsType {
	eventDetails: eventDetails
}

const EventDetails = ({eventDetails}: eventDetailsType) => {
	return (
		<AppFrame>
			<div className={classes['event-details']}>
				<EventLimit />
				<span><p>Date: </p> {dayjs(eventDetails.eventDate).format('DD/MM/YYYY')}</span>
				<span><p>Filter By Food Types</p></span>
				<span><p>Filter by Dietary Types</p></span>
			</div>
  		</AppFrame>
	);

	function EventLimit () {
		if(!eventDetails.eventLimit) return <></>
		return <span><p>Person Limit:</p>{eventDetails.eventLimit}</span>
	}
}
 
export default EventDetails;