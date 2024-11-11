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
    const { messages, accountId } = useAppSelector(state => {
        return { messages: state.messages.messages, accountId: state.account.id }
    })

    return (
        <div className={classes['messages--container']}>
            {
                messages && accountId && messages.map((message, key) => {
                    if (accountId === message.user_id) return <MessageOwner message={message} key={key}></MessageOwner>
                    else return <NonUserMessage message={message} key={key}></NonUserMessage>
                })
            }
            <div className='messages--input-container'>
                <MessageForm />
            </div>
        </div>
    )
}

interface MessageOwnerProps {
    message: message
}

const MessageOwner = ({ message }: MessageOwnerProps) => {
    return (
        <div className={classes['message--owner']}>
            {message.message}
        </div>
    )
}


interface NonUserMessageProps {
    message: message
}

const NonUserMessage = ({ message }: NonUserMessageProps) => {
    return (
        <div className={classes['message--other']}>
            {message.message}
        </div>
    )
}

export default Messages