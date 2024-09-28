import accountReducer, { accountState, accountType } from './account';
import groupsReducer, { groupState, groupType } from './groups';
import { configureStore } from '@reduxjs/toolkit'

export interface stateType {
	account: accountType,
	groups: groupType
}

const reducer = {
	account: accountReducer,
	groups: groupsReducer
}

const preloadedState: stateType = {
	account: accountState,
	groups: groupState
}


const StoreContext = configureStore({reducer, preloadedState})

export default StoreContext
export type DispatchType = typeof StoreContext.dispatch
export type RootState = ReturnType<typeof StoreContext.getState>