import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { group } from 'Assets/Types/GroupType'

export interface groupType {
    userGroups: group[],
    selectedGroup?: group
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
        setSelectedGroup: (state, action: PayloadAction<group>) => {
            state.selectedGroup = action.payload
        },
    }
})

export const { setGroupState, setSelectedGroup } = groupsSlice.actions
export { initialState as groupState }
export default groupsSlice.reducer