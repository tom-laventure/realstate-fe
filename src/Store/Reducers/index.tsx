import accountReducer, { accountState, accountType } from './account';
import eventReducer, { eventState, eventType } from './event';
import { configureStore } from '@reduxjs/toolkit'

export interface stateType {
	account: accountType,
	event: eventType
}

const reducer = {
	account: accountReducer,
	event: eventReducer
}

const preloadedState: stateType = {
	account: accountState,
	event: eventState
}


const StoreContext = configureStore({reducer, preloadedState})

export default StoreContext
export type DispatchType = typeof StoreContext.dispatch
export type RootState = ReturnType<typeof StoreContext.getState>