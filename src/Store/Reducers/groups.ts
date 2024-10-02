import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { group } from 'Assets/Types/GroupType'

export interface groupType {
    userGroups: group[]
}

const initialState: groupType = {
    userGroups: []
}

const groupsSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setGroups: (state, action: PayloadAction<group[]>) => {
            state.userGroups = action.payload
        }
    }
})

export const { setGroups } = groupsSlice.actions
export { initialState as groupState }
export default groupsSlice.reducer