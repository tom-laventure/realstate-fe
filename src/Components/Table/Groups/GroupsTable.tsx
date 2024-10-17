import React from 'react'
import classes from './GroupsTable.module.scss'
import { group } from 'Assets/Types/GroupType'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

type Props = {
    groups?: group[];
}

const GroupsTable = ({ groups }: Props) => {
    const navigate = useNavigate()
    const goToGroup = (id: number | undefined) => {
        navigate(`/estates/${id}`)
    }

    return (
        <div className={classes['groups-table']}>
            <Table>
                <TableHead>
                    <TableCell>Group Name</TableCell>
                    <TableCell># in Group</TableCell>
                    <TableCell>Active Listings</TableCell>
                </TableHead>
                <TableBody>
                    {groups && groups.map((group, index) => {
                        return <Group key={index} name={group.name} click={() => goToGroup(group.id)} />
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

type groupProps = {
    name: string;
    members?: number,
    activeListings?: number,
    click: () => void
}

const Group = ({ name, members = 0, activeListings = 0, click }: groupProps) => {
    return (
        <TableRow className={classes['group']} onClick={() => click()}>
            <TableCell className={classes['group--name']}>{name}</TableCell>
            <TableCell className={classes['group--members']}>{members}</TableCell>
            <TableCell className={classes['group--active-listings']}>{activeListings}</TableCell>
        </TableRow>
    )
}

export default GroupsTable