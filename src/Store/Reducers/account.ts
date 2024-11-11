import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface accountType {
	name: string,
	id: number
}

const initialState: accountType = {
	name: '',
	id: 0
}

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<accountType>) => {
			state.id = action.payload.id
		},
		clearUser: (state) => {
			state.id = 0
		}
	}
})

export const { updateUser, clearUser } = accountSlice.actions
export { initialState as accountState }
export default accountSlice.reducer