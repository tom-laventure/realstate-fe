import React, { useEffect, useState } from 'react'
import classes from './EstatesDashboard.module.scss'
import useFetchEstates from 'Store/Hooks/Estates/useFetchEstates'
import { useParams } from 'react-router-dom'
import EstateTable from 'Components/Table/Estates/EstateTable'
import { useAppDispatch, useAppSelector } from 'Store/Hooks/useDispatch'
import GroupSideNav from 'Components/Navbar/SideNav/GroupSideNav/GroupSideNav'
import { Button } from '@mui/material'
import connectToChat from 'Assets/Websocket/ChatChannel'
import Messages from 'Components/View/Messages/Messages'
import message from 'Assets/Types/MessageType'
import { pushMessage } from 'Store/Reducers/messages'

const EstatesDashboard = () => {
    const dispatch = useAppDispatch()
    const [addUserPopup, setAddUserPopup] = useState(false)
    const estates = useAppSelector(state => state.estates.userEstates)
    const { group_id } = useParams()
    const { isLoading } = useFetchEstates(group_id)

    const messageRecieved = (message: message) => {
        dispatch(pushMessage(message))
    }

    useEffect(() => {
        if (group_id) connectToChat(group_id, messageRecieved)
    }, [])

    return (
        <div className={classes['estate-dashboard']}>
            <GroupSideNav />
            <div className={classes['estate-dashboard--estates-table']}>
                <div className={classes['estate-dashboard--estates-table__button']}>
                    <Button>Create Estate</Button>
                    <Button>Add User</Button>
                </div>
                <Messages />
                {/* <EstateTable estates={estates} /> */}

            </div>
            {addUserPopup}
        </div>
    )
}

export default EstatesDashboard