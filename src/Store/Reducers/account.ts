import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface accountType {
	name: string,
	userId: string
}

const initialState: accountType = {
	name: '',
	userId: ''
}

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<accountType>) => {
			state.name = action.payload.name,
			state.userId = action.payload.userId
		}
	}
})

export const {updateUser} = accountSlice.actions
export {initialState as accountState}
export default accountSlice.reducer