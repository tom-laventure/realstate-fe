import React from 'react'
import classes from './GroupsTable.module.scss'
import { group } from 'Assets/Types/GroupType'
import { NavigateFunction, useNavigate } from 'react-router-dom';

type Props = {
    groups?: group[];
}

const GroupsTable = ({ groups }: Props) => {
    const navigate = useNavigate()

    return (
        <div className={classes['groups-table']}>
            {groups && groups.map((group, index) => {
                return <Group key={index} name={group.name} id={group.id} navigate={navigate} />
            })}
        </div>
    )
}

type groupProps = {
    name: string;
    members?: number,
    id?: number,
    navigate: NavigateFunction
}

const Group = ({ name, members = 1, id, navigate }: groupProps) => {
    const goToGroup = (id: number|undefined) => {
        navigate(`/estates/${id}`)
    }

    return (
        <div className={classes['group']} onClick={() => goToGroup(id)}>
            <div className={classes['group--name']}>Group name: {name}</div>
            <div className={classes['group--members']}>Members in group: {members}</div>
        </div>
    )
}

export default GroupsTable