import { createSlice } from '@reduxjs/toolkit'

export interface eventType {
	eventName: string
}

const initialState = {
	eventName: ''
}

const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		setEventName: (state, action) => {
			state.eventName = action.payload
		}
	}
})

export const {setEventName} = eventSlice.actions
export {initialState as eventState}
export default eventSlice.reducer