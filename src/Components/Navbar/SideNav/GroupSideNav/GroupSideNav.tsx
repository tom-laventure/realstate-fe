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
            <span className={classes['side-nav--group-header']}>Group:</span>
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
                            }
                        </div>
                    })}
            </div>
        </div >
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


export default GroupSideNav