import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import comment from 'Assets/Types/EstateCommentType'
import { RatingResponse } from 'Assets/Types/EstateRatingType'
import estate from 'Assets/Types/EstateType'

export interface estateType {
    userEstates: estate[],
    selectedEstate: estate,
    orderby?: string
}

const initialState: estateType = {
    userEstates: [],
    selectedEstate: {
        header: '',
        id: -1,
        link: '',
        estate_ratings: [],
        user_rating: undefined,
        image: ''
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
        pushEstate: (state, action: PayloadAction<estate>) => {
            state.userEstates.push(action.payload)
        },
        addComment: (state, action: PayloadAction<comment>) => {
            state.selectedEstate?.estate_comments?.push(action.payload)
        },
        setComments: (state, action: PayloadAction<comment[]>) => {
            state.selectedEstate.estate_comments = action.payload
        },
        setRatings: (state, action: PayloadAction<RatingResponse>) => {
            state.selectedEstate.estate_ratings = action.payload.estate_ratings
            state.selectedEstate.user_rating = action.payload.user_rating
        },
        setOrderBy: (state, action: PayloadAction<string>) => {
            state.orderby = action.payload
        },
    }
})

export const {
    setEstates,
    setSelectedEstate,
    addComment,
    setComments,
    setRatings,
    pushEstate,
    setOrderBy
} = estatesSlice.actions
export { initialState as estateState }
export default estatesSlice.reducer