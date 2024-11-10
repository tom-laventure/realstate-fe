import React from 'react'
import classes from './Messages.module.scss'
import useFetchMessages from 'Store/Hooks/Messages/useFetchMessages'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import message from 'Assets/Types/MessageType'
import { TextField } from '@mui/material'
import MessageForm from 'Components/Common/Form/Message/MessageForm'

const Messages = () => {
    const { group_id } = useParams()
    const { } = useFetchMessages(group_id)
    const messages = useAppSelector(state => state.messages.messages)

    return (
        <div className={classes['messages--container']}>
            {
                messages && messages.map((message, key) => {
                    return <Message message={message} key={key}></Message>
                })
            }
            <div className='messages--input-container'>
                <MessageForm />
            </div>
        </div>
    )
}

interface MessageProps {
    message: message
}

const Message = ({ message }: MessageProps) => {
    return (
        <div className={classes['message--owner']}>
            {message.message}
        </div>
    )
}

export default Messages