import React, { useEffect, useState } from 'react'
import classes from './GroupSelectedSideNav.module.scss'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import { group } from 'Assets/Types/GroupType'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from '@mui/material'

interface GroupSelectedSideNavProps {
    goBack: () => void
}

const GroupSelectedSideNav = ({ goBack }: GroupSelectedSideNavProps) => {
    const userGroups = useAppSelector(state => state.groups.userGroups)
    const { group_id } = useParams()
    const navigate = useNavigate()

    const [group, setGroup] = useState<group>({
        id: 0,
        channel: [],
        name: '',
        users: [],
        active_listings: 0
    })

    useEffect(() => {
        const tempGroup = userGroups.find(group => group.id == group_id)
        if (tempGroup) setGroup(tempGroup)
    }, [userGroups])

    return (
        <div>
            <span className={classes['selected-side-nav--header']}><Button color='inherit' onClick={goBack}><KeyboardBackspaceIcon /></Button>{group.name}</span>
            <div className={classes['selected-side-nav--channels']}>
                <div className={classes['selected-side-nav--channels__header']}><span>Your Chats:</span></div>
                <NavigationChannelLink
                    path={`/estates/${group.id}`}
                    name="General Chat"
                />
                {
                    group.channel?.map((channel, key) => {
                        return <NavigationChannelLink
                            name={channel.name}
                            path={`/estates/${group.id}/channel/${channel.id}`}
                            key={`${key}`} />
                    })
                }
                <NavigationChannelLink name="+ new chat" path={`/estates/${group.id}/create-chat`} />
            </div>

            <div className={classes['selected-side-nav--members']}>
                <span className={classes['selected-side-nav--members__header']}>Group Members</span>
                <div className={classes['selected-side-nav--member-array']}>

                </div>
            </div>
        </div>
    )
}

interface NavigationChannelLinkProps {
    name: string,
    path: string
}

const NavigationChannelLink = ({ name, path }: NavigationChannelLinkProps) => {
    return (
        <NavLink
            to={path}
            className={({ isActive }) =>
                `${classes['channel-navigation-link']} ${isActive && classes['channel-navigation-link--active']}`
            }>
            {name}
        </NavLink >
    )
}


export default GroupSelectedSideNav