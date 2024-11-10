import React from 'react'
import classes from './Messages.module.scss'
import useFetchMessages from 'Store/Hooks/Messages/useFetchMessages'
import { useParams } from 'react-router-dom'

const Messages = () => {
    const { group_id } = useParams()
    const { } = useFetchMessages(group_id)

    return (
        <div></div>
    )
}

export default Messages