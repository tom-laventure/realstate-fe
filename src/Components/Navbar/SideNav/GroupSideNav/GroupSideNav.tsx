import React, { useState } from 'react'
import classes from './GroupSideNav.module.scss'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { group } from 'Assets/Types/GroupType'
import user from 'Assets/Types/UserType'
import channel from 'Assets/Types/ChannelType'

const GroupSideNav = () => {
    const { group_id } = useParams()
    const [selectedChannel, setSelectedChannel] = useState()
    const groups = useAppSelector(state => state.groups.userGroups)

    return (
        <div className={classes['side-nav']}>
            Groups:
            <div className={classes['side-nav--links']}>
                {
                    groups.map((group, key) => {
                        const activeLink = group_id == group.id

                        return <div key={key}>
                            <NavigationGroupLink
                                group={group} />

                            {
                                activeLink &&
                                <div className={classes['side-nav--sub-links']}>
                                    {
                                        group.channel?.map((channel, key) => {
                                            return <NavigationChannelLink channel={channel} groupId={group.id} key={`${key}`} />
                                        })
                                    }
                                    <NavLink to={`/estates/${group.id}/create-chat`}>+ new chat</NavLink>
                                </div>
                            }
                        </div>
                    })}
            </div>
        </div>
    )
}

interface NavigationGroupLinkProps {
    group: group
}

const NavigationGroupLink = ({ group }: NavigationGroupLinkProps) => {
    return (
        <NavLink
            to={`/estates/${group.id}`}
            className={({ isActive }) =>
                `${classes['group-navigation-link']} ${isActive && classes['group-navigation-link--active']}`
            }>
            {group.name}
        </NavLink >
    )
}

interface NavigationChannelLinkProps {
    channel: channel,
    groupId?: number
}

const NavigationChannelLink = ({ channel, groupId }: NavigationChannelLinkProps) => {
    return (
        <NavLink
            to={`/estates/${groupId}/channel/${channel.id}`}
            className={({ isActive }) =>
                `${classes['user-navigation-link']} ${isActive && classes['user-navigation-link--active']}`
            }>
            {channel.name}
        </NavLink >
    )
}


export default GroupSideNav