import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import estate from 'Assets/Types/EstateType'

export interface estateType {
    userEstates: estate[],
    selectedEstate?: estate
}

const initialState: estateType = {
    userEstates: [],
    selectedEstate: undefined
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
        }
    }
})

export const { setEstates, setSelectedEstate } = estatesSlice.actions
export { initialState as estateState }
export default estatesSlice.reducer