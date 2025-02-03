import React, { useState } from 'react'
import classes from './GroupSelectedSideNav.module.scss'
import { NavLink, useParams } from 'react-router-dom'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Button } from '@mui/material'
import { AddUserPopup } from 'Components/Common/Popups/AddUser/AddUserPopup';

interface GroupSelectedSideNavProps {
    goBack: () => void
}

const GroupSelectedSideNav = ({ goBack }: GroupSelectedSideNavProps) => {
    const [showAddUserPopup, setShowAddUserPopup] = useState(false)
    const selectedGroup = useAppSelector(state => state.groups.selectedGroup)

    return (
        <div>
            <div className={classes['selected-side-nav--header__content']}>
                <Button color='inherit' onClick={goBack}>
                    <KeyboardBackspaceIcon />
                </Button>
                <div className={classes['selected-side-nav--header']}>{selectedGroup?.name}</div>
            </div>
            <div className={classes['selected-side-nav--channels']}>
                <div className={classes['selected-side-nav--channels__header']}><span>Your Chats:</span></div>
                <NavigationChannelLink
                    path={`/estates/${selectedGroup?.id}`}
                    name="General Chat"
                />
                {
                    selectedGroup && selectedGroup.channel?.map((channel, key) => {
                        return <NavigationChannelLink
                            name={channel.name}
                            path={`/estates/${selectedGroup.id}/channel/${channel.id}`}
                            key={`${key}`} />
                    })
                }
                <div className={classes['channel-navigation-button']}>+ new channel</div>
            </div>

            <div className={classes['selected-side-nav--members']}>
                <span className={classes['selected-side-nav--members__header']}>Group Members</span>
                <div className={classes['selected-side-nav--members__array']}>
                    {selectedGroup?.users.map((user, key) => {
                        return <div className={classes['selected-side-nav--members__user']} key={key}>{user.name}</div>
                    })}
                </div>
                <div onClick={() => setShowAddUserPopup(true)} className={classes['channel-navigation-button']}>+ new member</div>
            </div>
            {showAddUserPopup && <AddUserPopup close={() => setShowAddUserPopup(false)}/>}
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