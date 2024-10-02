import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { group } from 'Assets/Types/GroupType'

export interface groupType {
    userGroups: group[],
    selectedGroup?: number
}

const initialState: groupType = {
    userGroups: [],
    selectedGroup: undefined
}

const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        setGroupState: (state, action: PayloadAction<group[]>) => {
            state.userGroups = action.payload
        },
    }
})

export const { setGroupState } = groupsSlice.actions
export { initialState as groupState }
export default groupsSlice.reducer