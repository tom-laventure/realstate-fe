import React, { createRef, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import classes from './Messages.module.scss'
import useFetchMessages from 'Store/Hooks/Messages/useFetchMessages'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import message from 'Assets/Types/MessageType'
import MessageForm from 'Components/Common/Form/Message/MessageForm'
import { formatTime } from 'Helpers/DateFormat'

const Messages = () => {
    const [messagesLoaded, setMessagesLoaded] = useState(false)
    const [messagePage, setMessagePage] = useState(1)
    const [prevScrollHeight, setPrevScrollHeight] = useState(0)
    const messagesEndRef: RefObject<HTMLDivElement> = createRef();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { group_id, channel_id } = useParams()
    const { isLoading } = useFetchMessages(group_id, messagePage, channel_id)
    const { messages } = useAppSelector(state => {
        return { messages: state.messages.messages }
    })

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })

    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;

        if (containerRef.current.scrollTop === 0) {
            setMessagePage(index => ++index)
            const container = containerRef.current
            const previousScrollHeight = container.scrollHeight
            setPrevScrollHeight(previousScrollHeight)
        }
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('scroll', handleScroll)
        return () => container.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    useEffect(() => {
        setMessagePage(1)
    }, [group_id])

    useEffect(() => {
        if (!containerRef.current) return

        if (!messagesLoaded && messages.length) {
            scrollToBottom();
            setMessagesLoaded(true);
        } else if (messagesLoaded && messages.length) {
            const container = containerRef.current
            const currentScrollHeight = container.scrollHeight
            const scrollDifference = currentScrollHeight - prevScrollHeight
            container.scrollTop += scrollDifference
        }
    }, [messages, messagesLoaded])

    return (
        <div className={classes['messages--container']}>
            <div className={classes['messages--header']}>
                General Chat
            </div>
            <div
                className={classes['messages--message-array']}
                ref={containerRef}
            >
                {isLoading ? <div className={classes['messages--loading']}>loading...</div> : <></>}
                {
                    messages ? messages.map((message, key) => {
                        const owner = false
                        return <Message message={message} key={key} owner={owner} />
                    }) : <></>
                }
                <div ref={messagesEndRef} />
            </div>
            <div className={classes['messages--input-container']}>
                <MessageForm />
            </div>
        </div>
    )
}

interface MessageProps {
    message: message,
    owner: boolean
}

const Message = ({ message, owner }: MessageProps) => {
    return (
        <div className={`${owner ? classes['message--owner'] : classes['message--other']}`}>
            <div className={classes['message--body']}>
                {message.message}
            </div>
            <div className={classes['message--info']}>
                <div>{!owner && message.message_owner}</div>
                <div className={classes['message--datetime']}>{message.created_at && formatTime(message.created_at)}</div>
            </div>
        </div>
    )
}


export default Messages