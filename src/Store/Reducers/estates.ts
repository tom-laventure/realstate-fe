import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import comment from 'Assets/Types/EstateCommentType'
import estate from 'Assets/Types/EstateType'

export interface estateType {
    userEstates: estate[],
    selectedEstate: estate
}

const initialState: estateType = {
    userEstates: [],
    selectedEstate: {
        header: '',
        id: -1,
        link: ''
    }
}

const estatesSlice = createSlice({
    name: 'estates',
    initialState,
    reducers: {
        setEstates: (state, action: PayloadAction<estate[]>) => {
            state.userEstates = action.payload
        },
        setSelectedEstate: (state, action: PayloadAction<estate>) => {
            state.selectedEstate = action.payload
        },
        addComment: (state, action: PayloadAction<comment>) => {
            state.selectedEstate?.estate_comments?.push(action.payload)
        },
        replaceComment: (state, action: PayloadAction<comment>) => {
            const estateComments = state.selectedEstate?.estate_comments;
            const index = estateComments?.findIndex((el) => el.id === action.payload.id);

            if (index && state.selectedEstate?.estate_comments) {
                state.selectedEstate.estate_comments[index] = action.payload;
            }
        },
        setComments: (state, action: PayloadAction<comment[]>) => {
            state.selectedEstate.estate_comments = action.payload
        },
    }
})

export const { setEstates, setSelectedEstate, addComment, replaceComment, setComments } = estatesSlice.actions
export { initialState as estateState }
export default estatesSlice.reducer