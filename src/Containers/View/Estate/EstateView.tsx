import React from 'react'
import classes from './EstateView.module.scss'
import { useParams } from 'react-router-dom'
import useGetEstate from 'Store/Hooks/Estates/useGetEstate'
import GroupSideNav from 'Components/Navbar/SideNav/GroupSideNav/GroupSideNav'


type Props = {}

const EstateView = (props: Props) => {
    const params = useParams()
    const { selectedEstate } = useGetEstate(params.group_id, params.selected_id)

    return (
        <div className={classes['estate-view']}>
            <GroupSideNav />
        </div>
    )
}

export default EstateView