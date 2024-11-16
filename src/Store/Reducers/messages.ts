import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import message from 'Assets/Types/MessageType'


export interface messageType {
    messages: message[]
}

const initialState: messageType = {
    messages: []
}
const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<message[]>) => {
            state.messages = action.payload
        },
        pushMessage: (state, action: PayloadAction<message>) => {
            state.messages?.push(action.payload)
        },
        prependMessage: (state, action: PayloadAction<message[]>) => {
            state.messages = [...action.payload, ...state.messages]
        },
    }
})

export const { setMessages, pushMessage, prependMessage } = messagesSlice.actions
export { initialState as messagesState }
export default messagesSlice.reducer