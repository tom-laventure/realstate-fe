import React from 'react'
import classes from './GroupsTable.module.scss'
import { group } from 'Assets/Types/GroupType'
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material';
import users from 'Assets/Types/UserType';

type Props = {
    groups?: group[];
}

const GroupsTable = ({ groups }: Props) => {
    const navigate = useNavigate()
    const goToGroup = (id: number | undefined) => {
        navigate(`/estates/${id}`)
    }

    return (
        <Table className={classes['groups-table']}>
            <TableHead>
                <TableRow>
                    <TableCell>Group Name</TableCell>
                    <TableCell>Active Listings</TableCell>
                    <TableCell>Users in Group</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {groups && groups.map((group, index) => {
                    return <Group key={index} name={group.name} click={() => goToGroup(group.id)} activeListings={group.active_listings} members={group.users} />
                })}
            </TableBody>
        </Table>
    )
}

type groupProps = {
    name: string,
    members: users[],
    activeListings?: number,
    click: () => void
}

const Group = ({ name, members = [], activeListings = 0, click }: groupProps) => {
    const memberNames = members.map((user, key) => {
        return <div key={key}>{user.first_name}</div>
    })

    return (
        <TableRow className={classes['group--row']} onClick={() => click()}>
            <TableCell className={classes['group--name']}>{name}</TableCell>
            <TableCell className={classes['group--active-listings']}>{activeListings}</TableCell>
            <TableCell className={classes['group--members']}>
                <Tooltip title={memberNames}><Button>{members.length}</Button></Tooltip>
            </TableCell>
        </TableRow >
    )
}

export default GroupsTable