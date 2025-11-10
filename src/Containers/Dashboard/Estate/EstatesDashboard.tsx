import React, { useEffect } from 'react'
import classes from './EstatesDashboard.module.scss'
import useFetchEstates from 'Store/Hooks/Estates/useFetchEstates'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'Store/Hooks/useDispatch'
import connectToChat from 'Assets/Websocket/ChatChannel'
import message from 'Assets/Types/MessageType'
import { pushMessage } from 'Store/Reducers/messages'
import EstateTable from 'Components/Table/Estates/EstateTable'

const EstatesDashboard = () => {
    const dispatch = useAppDispatch()
    const { estates, order } = useAppSelector(state => {
        return { estates: state.estates.userEstates, order: state.estates.orderby }
    })
    const { group_id } = useParams()
    const { isLoading } = useFetchEstates({
        id: group_id,
        order: order
        }
    )

    const messageRecieved = (message: message) => dispatch(pushMessage(message))

    useEffect(() => {
        if (group_id) connectToChat(group_id, messageRecieved)
    }, [])

    if (isLoading) return <></>
    return (
        <div className={classes['estate-dashboard']}>
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
        </div>
    )
}

export default EstatesDashboard