import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import message from 'Assets/Types/MessageType'


export interface messageType {
    messages?: message[]
}

const initialState: messageType = {
    messages: undefined
}
const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<message[]>) => {
            state.messages = action.payload
        },
    }
})

export const { setMessages } = messagesSlice.actions
export { initialState as messagesState }
export default messagesSlice.reducer