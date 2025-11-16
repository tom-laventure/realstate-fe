import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import subcomment from 'Assets/Types/EstateSubCommentType'

export interface subcommentType {
    subcomments: subcomment[]
    editSubcomment?: subcomment | undefined
}

const initialState: subcommentType = {
    subcomments: [],
    editSubcomment: undefined
}

const subcommentsSlice = createSlice({
    name: 'subcomments',
    initialState,
    reducers: {
        setSubcomments: (state, action: PayloadAction<subcomment[]>) => {
            state.subcomments = action.payload
        },
        setEditSubcomment: (state, action: PayloadAction<subcomment | undefined>) => {
            state.editSubcomment = action.payload
        },
        upsertSubcomment: (state, action: PayloadAction<subcomment>) => {
            const idx = state.subcomments.findIndex(s => s.id === action.payload.id)
            if (idx >= 0) state.subcomments[idx] = action.payload
            else state.subcomments.unshift(action.payload)
        },
        removeSubcomment: (state, action: PayloadAction<number>) => {
            state.subcomments = state.subcomments.filter(s => s.id !== action.payload)
        },
    }
})

export const { setSubcomments, setEditSubcomment, upsertSubcomment, removeSubcomment } = subcommentsSlice.actions
export { initialState as subcommentState }
export default subcommentsSlice.reducer