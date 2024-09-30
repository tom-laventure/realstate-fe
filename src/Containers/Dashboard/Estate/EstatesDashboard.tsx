import React from 'react'
import classes from './EstateDashboard.module.scss'
import useFetchEstates from 'Store/Hooks/Estates/useFetchEstates'
import { useParams } from 'react-router-dom'

const EstatesDashboard = () => {
    const { id } = useParams()
    const { } = useFetchEstates(id)

    return (
        <div></div>
    )
}

export default EstatesDashboard