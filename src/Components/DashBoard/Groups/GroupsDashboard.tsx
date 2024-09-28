import React from 'react'
import classes from './GroupDashboard.module.scss'
import { group } from 'Assets/Types/GroupTypes'

type Props = {
    groups?: group[];
}

type groupProps = {
    name: string;
}

const GroupsDashboard = ({ groups }: Props) => {
    return (
        <div className={classes.container}>
            {groups && groups.map((group, index) => {
                return <Group key={index} name={group.name} />
            })}
        </div>
    )
}

const Group = ({ name }: groupProps) => {
    return (
        <div>
            {name}
        </div>
    )
}

export default GroupsDashboard