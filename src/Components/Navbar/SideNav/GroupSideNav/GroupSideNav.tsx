import React from 'react'
import classes from './GroupSideNav.module.scss'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { group } from 'Assets/Types/GroupType'
import user from 'Assets/Types/UserType'

const GroupSideNav = () => {
    const { group_id } = useParams()
    const groups = useAppSelector(state => state.groups.userGroups)
    console.log(groups)
    return (
        <div className={classes['side-nav']}>
            Groups:
            <div className={classes['side-nav--links']}>
                {
                    groups.map((group, key) => {
                        const activeLink = group_id == group.id

                        return <>
                            <NavigationGroupLink
                                key={key}
                                group={group} />
                            {
                                activeLink && group.users.map((user, key) => {
                                    return <NavigationUserLink user={user} key={key} />
                                })
                            }
                        </>
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

interface NavigationUserLinkProps {
    user: user
}

const NavigationUserLink = ({ user }: NavigationUserLinkProps) => {
    return (
        <NavLink
            to={`/estates/${user.id}`}
            className={({ isActive }) =>
                `${classes['user-navigation-link']} ${isActive && classes['user-navigation-link--active']}`
            }>
            {user.name}
        </NavLink >
    )
}


export default GroupSideNav