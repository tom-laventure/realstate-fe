import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import comment from 'Assets/Types/EstateCommentType'
import subcomment from 'Assets/Types/EstateSubCommentType'

export interface subcommentType {
    subcomments: subcomment[],
    selectedComment: comment
}

const initialState: subcommentType = {
    subcomments: [],
    selectedComment: {
        comment: '',
        estate_id: -1,
        comment_type: ''
    }
}

const subcommentsSlice = createSlice({
    name: 'subcomments',
    initialState,
    reducers: {
    }
})

export const { } = subcommentsSlice.actions
export { initialState as subCommentState }
export default subcommentsSlice.reducer