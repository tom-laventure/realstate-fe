import React from 'react'
import classes from './SideNav.module.scss'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { group } from 'Assets/Types/GroupType'
import useFetchEstates from 'Store/Hooks/Estates/useFetchEstates'

const SideNav = () => {
    const groups = useAppSelector(state => state.groups.userGroups)

    return (
        <div className={classes['side-nav']}>
            Groups:
            <div className={classes['side-nav--links']}>
                {
                    groups.map((group, key) => {
                        return <NavigationLink
                            key={key}
                            group={group} />
                    })}
            </div>
        </div>
    )
}

interface NavigationLinkProps {
    group: group
}

const NavigationLink = ({ group }: NavigationLinkProps) => {
    return (
        <NavLink
            to={`/estates/${group.id}`}
            className={({ isActive }) =>
                `${classes['navigation-link']} ${isActive ? classes['navigation-link--active'] : classes['navigation-link']}`
            }>
            {group.name}
        </NavLink >
    )
}

export default SideNav