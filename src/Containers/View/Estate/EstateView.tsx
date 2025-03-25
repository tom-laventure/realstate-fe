import React from 'react'
import classes from './EstateView.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import useGetEstate from 'Store/Hooks/Estates/useGetEstate'
import GroupSideNav from 'Components/Navbar/SideNav/GroupSideNav/GroupSideNav'
import CommentsTable from 'Components/Table/Comments/CommentsTable'
import { Estate } from 'Components/Table/Estates/EstateTable'
import { Button } from '@mui/material'


type Props = {}

const EstateView = (props: Props) => {
    const params = useParams()
    const { selectedEstate, isLoading } = useGetEstate(params.group_id, params.selected_id)
    const navigate = useNavigate()

    if (isLoading) return <></>

    return (
        <div className={classes['estate-view']}>
            <div className={classes['estate-view--content']}>
                <div className={classes['estate-view--body']}>
                    <div className={classes['estate-view--content__button-container']}>
                        <Button onClick={() => navigate(`/estates/${params.group_id}`)}>Go Back</Button>
                    </div>
                    <Estate estate={selectedEstate} click={() => { }} />
                    <CommentsTable estate={selectedEstate} />
                </div>
            </div>
            <div />
        </div>
    )
}

export default EstateView