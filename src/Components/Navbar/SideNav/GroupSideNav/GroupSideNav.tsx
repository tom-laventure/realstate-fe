import React, { useEffect, useState } from 'react'
import classes from './GroupSideNav.module.scss'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import { NavLink, useParams } from 'react-router-dom'
import { group } from 'Assets/Types/GroupType'
import GroupSelectedSideNav from '../GroupSelectedSideNav/GroupSelectedSideNav'

const GroupSideNav = () => {
    const { group_id } = useParams()
    const [selectedGroup, setSelectedGroup] = useState(false)
    const groups = useAppSelector(state => state.groups.userGroups)

    useEffect(() => {
        setSelectedGroup(!!group_id)
    }, [group_id])


    return (
        <div className={classes['side-nav']}>
            {selectedGroup ?
                <GroupSelectedSideNav goBack={() => setSelectedGroup(false)}/>
                : <div className={classes['side-nav--group-selection']}>
                    <span className={classes['side-nav--group-header']}>Your Groups:</span>
                    {
                        groups.map((group, key) => {
                            return <div key={key}>
                                <NavigationGroupLink
                                    group={group} />
                            </div>
                        })}
                </div>}
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
                `${classes['group-navigation-link']}`
            }>
            {group.name}
        </NavLink >
    )
}


export default GroupSideNav