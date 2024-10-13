import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import subcomment from 'Assets/Types/EstateSubCommentType'

export interface subcommentType {
    subcomments: subcomment[]
}

const initialState: subcommentType = {
    subcomments: []
}

const subcommentsSlice = createSlice({
    name: 'subcomments',
    initialState,
    reducers: {
        setSubcomments: (state, action: PayloadAction<subcomment[]>) => {
            state.subcomments = action.payload
        },
    }
})

export const { setSubcomments } = subcommentsSlice.actions
export { initialState as subcommentState }
export default subcommentsSlice.reducer