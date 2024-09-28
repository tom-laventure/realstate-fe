import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { group } from 'Assets/Types/GroupTypes'

export interface groupType {
    groups: group[]
}

const initialState: groupType = {
    groups: []
}

const groupsSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setGroups: (state, action: PayloadAction<groupType>) => {
            state.groups = action.payload.groups
        }
    }
})

export const { setGroups } = groupsSlice.actions
export { initialState as groupState }
export default groupsSlice.reducer