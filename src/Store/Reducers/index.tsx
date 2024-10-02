import accountReducer, { accountState, accountType } from './account';
import estatesReducer, { estateType, estateState } from './estates';
import groupsReducer, { groupState, groupType } from './groups';
import { configureStore } from '@reduxjs/toolkit'

export interface stateType {
	account: accountType,
	groups: groupType,
	estates: estateType
}

const reducer = {
	account: accountReducer,
	groups: groupsReducer,
	estates: estatesReducer
}

const preloadedState: stateType = {
	account: accountState,
	groups: groupState,
	estates: estateState
}


const StoreContext = configureStore({reducer, preloadedState})

export default StoreContext
export type DispatchType = typeof StoreContext.dispatch
export type RootState = ReturnType<typeof StoreContext.getState>