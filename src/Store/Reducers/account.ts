import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface accountType {
	name: string,
	id: string,
	account_id?: string
}

const initialState: accountType = {
	name: '',
	id: '',
	account_id: undefined
}

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<accountType>) => {
			state = action.payload
		}
	}
})

export const {updateUser} = accountSlice.actions
export {initialState as accountState}
export default accountSlice.reducer