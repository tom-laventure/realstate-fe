import React, { createRef, RefObject, useEffect } from 'react'
import classes from './Messages.module.scss'
import useFetchMessages from 'Store/Hooks/Messages/useFetchMessages'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import message from 'Assets/Types/MessageType'
import MessageForm from 'Components/Common/Form/Message/MessageForm'

const Messages = () => {
    const messagesEndRef: RefObject<HTMLDivElement> = createRef();
    const { group_id } = useParams()
    const { } = useFetchMessages(group_id)
    const { messages, accountId } = useAppSelector(state => {
        return { messages: state.messages.messages, accountId: state.account.id }
    })

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
    }


    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className={classes['messages--container']}>
            <div className={classes['messages--message-array']}>
                {
                    messages && accountId && messages.map((message, key) => {
                        if (accountId === message.user_id) return <MessageOwner message={message} key={key}></MessageOwner>
                        else return <NonMessageOwner message={message} key={key}></NonMessageOwner>
                    })
                }
                <div ref={messagesEndRef} />
            </div>
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


interface NonMessageOwnerProps {
    message: message
}

const NonMessageOwner = ({ message }: NonMessageOwnerProps) => {
    return (
        <div className={classes['message--other']}>
            {message.message}
        </div>
    )
}

export default Messages