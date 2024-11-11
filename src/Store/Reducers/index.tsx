import accountReducer, { accountState, accountType } from './account';
import commentReducer, { commentType, commentState } from './comments';
import estatesReducer, { estateType, estateState } from './estates';
import groupsReducer, { groupState, groupType } from './groups';
import messagesReducer,{ messagesState, messageType } from './messages';
import subcommentReducer, { subcommentState, subcommentType } from './subcomments';
import { configureStore } from '@reduxjs/toolkit'

export interface stateType {
	account: accountType,
	groups: groupType,
	estates: estateType,
	subcomments: subcommentType,
	comments: commentType,
	messages: messageType
}


const reducer = {
	account: accountReducer,
	groups: groupsReducer,
	estates: estatesReducer,
	subcomments: subcommentReducer,
	comments: commentReducer,
	messages: messagesReducer
}

const preloadedState: stateType = {
	account: accountState,
	groups: groupState,
	estates: estateState,
	subcomments: subcommentState,
	comments: commentState,
	messages: messagesState
}


const StoreContext = configureStore({ reducer, preloadedState })

export default StoreContext
export type DispatchType = typeof StoreContext.dispatch
export type RootState = ReturnType<typeof StoreContext.getState>