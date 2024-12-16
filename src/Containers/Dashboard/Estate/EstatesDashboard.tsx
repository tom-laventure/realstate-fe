import React, { useEffect, useState } from 'react'
import classes from './EstatesDashboard.module.scss'
import useFetchEstates from 'Store/Hooks/Estates/useFetchEstates'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'Store/Hooks/useDispatch'
import GroupSideNav from 'Components/Navbar/SideNav/GroupSideNav/GroupSideNav'
import { Button } from '@mui/material'
import connectToChat from 'Assets/Websocket/ChatChannel'
import Messages from 'Components/View/Messages/Messages'
import message from 'Assets/Types/MessageType'
import { pushMessage } from 'Store/Reducers/messages'
import { AddUserPopup } from 'Components/Common/Popups/AddUser/AddUserPopup'
import EstateTable from 'Components/Table/Estates/EstateTable'

const EstatesDashboard = () => {
    const dispatch = useAppDispatch()
    const [addUserPopup, setAddUserPopup] = useState(false)
    const estates = useAppSelector(state => state.estates.userEstates)
    const { group_id } = useParams()
    const { } = useFetchEstates(group_id)

    const messageRecieved = (message: message) => dispatch(pushMessage(message))

    useEffect(() => {
        if (group_id) connectToChat(group_id, messageRecieved)
    }, [])

    return (
        <div className={classes['estate-dashboard']}>
            <GroupSideNav />
            {group_id ?
                <div className={classes['estate-dashboard--content']}>
                    <div className={classes['estate-dashboard--body']}>
                        {/* <Messages /> */}
                        <EstateTable estates={estates} />
                    </div>

                </div>
                :
                <div className={classes['estate-dashboard--home']}>

                </div>
            }
            {addUserPopup && <AddUserPopup close={() => setAddUserPopup(false)} />}
        </div>
    )
}

export default EstatesDashboard