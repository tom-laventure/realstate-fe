import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import comment from 'Assets/Types/EstateCommentType'
import { RatingResponse } from 'Assets/Types/EstateRatingType'
import estate from 'Assets/Types/EstateType'

export interface estateType {
    userEstates: estate[],
    selectedEstate: estate,
    orderby?: string,
    favoritesOnly?: boolean,
    filterBy: string | undefined  // add this
}

const initialState: estateType = {
    userEstates: [],
    selectedEstate: {
        address: '',
        id: -1,
        link: '',
        estate_ratings: [],
        user_rating: undefined,
        image: '',
        estate_comment_count: 0,
        liked: false
    },
    favoritesOnly: false,
    filterBy: undefined
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
        setFavoritesOnly: (state, action: PayloadAction<boolean>) => {
            state.favoritesOnly = action.payload
        },
        setFilterBy: (state, action: PayloadAction<string | undefined>) => {  // add this
            state.filterBy = action.payload
        }
    }
})

export const {
    setEstates,
    setSelectedEstate,
    addComment,
    setComments,
    setRatings,
    pushEstate,
    setOrderBy,
    setFavoritesOnly,
    setFilterBy
} = estatesSlice.actions
export { initialState as estateState }
export default estatesSlice.reducer