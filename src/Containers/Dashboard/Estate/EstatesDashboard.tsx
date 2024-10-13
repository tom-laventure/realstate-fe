import React from 'react'
import classes from './EstatesDashboard.module.scss'
import useFetchEstates from 'Store/Hooks/Estates/useFetchEstates'
import { useParams } from 'react-router-dom'
import EstateTable from 'Components/Table/Estates/EstateTable'
import { useAppSelector } from 'Store/Hooks/useDispatch'

const EstatesDashboard = () => {
    const estates = useAppSelector(state => state.estates.userEstates)
    const { estate_id } = useParams()
    const { isLoading } = useFetchEstates(estate_id)

    return (
        <div className={classes['estate-dashboard']}>
            <EstateTable estates={estates} />
        </div>
    )
}

export default EstatesDashboard