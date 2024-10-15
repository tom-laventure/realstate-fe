import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import comment from 'Assets/Types/EstateCommentType'


export interface commentType {
    editComment?: comment
}

const initialState: commentType = {
    editComment: undefined
}

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        editComment: (state, action: PayloadAction<comment | undefined>) => {
            state.editComment = action.payload
        }
    }
})

export const { editComment } = commentsSlice.actions
export { initialState as commentState }
export default commentsSlice.reducer