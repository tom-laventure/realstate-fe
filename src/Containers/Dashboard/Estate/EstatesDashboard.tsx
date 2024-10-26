import React from 'react'
import classes from './EstatesDashboard.module.scss'
import useFetchEstates from 'Store/Hooks/Estates/useFetchEstates'
import { useParams } from 'react-router-dom'
import EstateTable from 'Components/Table/Estates/EstateTable'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import SideNav from 'Components/Navbar/SideNav/SideNav'
import { Button } from '@mui/material'

const EstatesDashboard = () => {
    const estates = useAppSelector(state => state.estates.userEstates)
    const { estate_id } = useParams()
    const { isLoading } = useFetchEstates(estate_id)

    return (
        <div className={classes['estate-dashboard']}>
            <SideNav />
            <div className={classes['estate-dashboard--estates-table']}>
                <div className={classes['estate-dashboard--estates-table__button']}>
                    <Button>Create Estate</Button>
                </div>
                <EstateTable estates={estates} />
            </div>
        </div>
    )
}

export default EstatesDashboard