import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import user from 'Assets/Types/UserType'

export interface accountType extends user { }

const initialState: accountType = {
	first_name: '',
	last_name: '',
	email: '',
	phone: '',
	address: '',
	profile_completed: false,
}

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<user>) => {
			state = action.payload
		}
	}
})

export const { updateUser } = accountSlice.actions
export { initialState as accountState }
export default accountSlice.reducer