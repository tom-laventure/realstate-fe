import { Dayjs } from 'dayjs'
import React, { useRef, useState } from 'react'
import { body } from "../../../../Assets/API/CreateEvent"
import useCreateEvent from '../../../../Store/Hooks/useCreateEvent';
import { useAppSelector } from '../../../../Store/Hooks/useDispatch';
import AppButton from '../../Buttons/AppButton'
import FormCheckbox from '../../Buttons/Checkbox'
import DatePicker from '../../Inputs/DatePicker'
import Text from '../../Inputs/Text'
import classes from './CreateEvent.module.scss'

interface formControlType {
	maxGuestLimit: boolean,
	date: Dayjs | null
}

const CreateEventForm = () => {
	const { userId, name } = useAppSelector((state) => state.account)
	const eventName = useRef<HTMLInputElement>(null)
	const eventNotes = useRef<HTMLInputElement>(null)
	const [mutate] = useCreateEvent()
	const [formControl, setFormControl] = useState<formControlType>({
		maxGuestLimit: false,
		date: null
	})

	const createEvent = async () => {
        const user = {};
		if (eventName.current?.value && eventNotes.current?.value && formControl.date) {
			const body: body = {
				eventName: eventName.current?.value,
				eventNotes: eventNotes.current?.value,
				username: name,
				userId: userId,
				eventDate: formControl.date
			}
			mutate(body)
		} else {
			const body = {
				eventName: eventName.current?.value,
				eventNotes: eventNotes.current?.value,
				eventDate: formControl.date
			}
			console.log(body, userId, name, user)
		}
	}

	const setDate = (date: Dayjs | null) => {
		setFormControl({ ...formControl, date: date })
	}


	const maxGuestLimitInput = () => {
		return formControl.maxGuestLimit ? <div className={classes['create-event__input-group']}>
			<Text
				label="Maximum Guest List"
				type='number'
				placeholder='1 - 100'
			/>
		</div> : ''
	}


	return (
		<form className={classes['create-event']}>
			<span className={classes['create-event__header']}>Create Event</span>

			<div className={classes['create-event__input-group']}>
				<Text
					label="Name of Event"
					refValue={eventName}
				/>
			</div>

			<div className={classes['create-event__input-group']}>
				<DatePicker
					label="Date of Event"
					handleChange={setDate}
					value={formControl.date}
				/>
			</div>

			<div className={classes['create-event__input-group--checkbox']}>
				<FormCheckbox
					label="Set Maximum Guest List"
					click={() => setFormControl({ ...formControl, maxGuestLimit: !formControl.maxGuestLimit })}
				/>
			</div>
			{maxGuestLimitInput()}
			<div className={classes['create-event__input-group']}>
				<Text
					label="Notes for Guests"
					multiline
					minRows={3}
					refValue={eventNotes}
				/>
			</div>
			<div className={classes['create-event__button']}>
				<AppButton
					click={createEvent}
					variant="contained"
				>
					Create Event
				</AppButton>
			</div>
		</form>
	)
}

export default CreateEventForm