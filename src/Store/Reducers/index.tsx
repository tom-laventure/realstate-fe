import accountReducer, { accountState, accountType } from './account';
import { configureStore } from '@reduxjs/toolkit'

export interface stateType {
	account: accountType,
}

const reducer = {
	account: accountReducer,
}

const preloadedState: stateType = {
	account: accountState,
}


const StoreContext = configureStore({reducer, preloadedState})

export default StoreContext
export type DispatchType = typeof StoreContext.dispatch
export type RootState = ReturnType<typeof StoreContext.getState>