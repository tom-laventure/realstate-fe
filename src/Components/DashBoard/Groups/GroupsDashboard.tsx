import React from 'react'
import classes from './GroupDashboard.module.scss'
import { group } from 'Assets/Types/GroupTypes'

type Props = {
    groups?: group[];
}

type groupProps = {
    name: string;
    members?: number
}

const GroupsDashboard = ({ groups }: Props) => {
    return (
        <div className={classes['groups-dashboard']}>
            {groups && groups.map((group, index) => {
                return <Group key={index} name={group.attributes.name} />
            })}
        </div>
    )
}

const Group = ({ name, members = 1 }: groupProps) => {
    return (
        <div className={classes['group']}>
            <div className={classes['group--name']}>Group name: {name}</div>
            <div className={classes['group--members']}>Members in group: {members}</div>
        </div>
    )
}

export default GroupsDashboard