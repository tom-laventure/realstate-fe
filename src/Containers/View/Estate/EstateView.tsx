import React from 'react'
import classes from './EstateView.module.scss'
import { useParams } from 'react-router-dom'
import useGetEstate from 'Store/Hooks/Estates/useGetEstate'
import GroupSideNav from 'Components/Navbar/SideNav/GroupSideNav/GroupSideNav'
import CommentsTable from 'Components/Table/Comments/CommentsTable'


type Props = {}

const EstateView = (props: Props) => {
    const params = useParams()
    const { selectedEstate } = useGetEstate(params.group_id, params.selected_id)

    return (
        <div className={classes['estate-view']}>
            <GroupSideNav />
            <CommentsTable estate={selectedEstate}/>
        </div>
    )
}

export default EstateView