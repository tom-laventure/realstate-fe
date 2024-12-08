import React, { useEffect, useState } from 'react'
import classes from './EstateTable.module.scss'
import estate from 'Assets/Types/EstateType'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Rating, Tooltip } from '@mui/material'
import rating from 'Assets/Types/EstateRatingType'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import AddEstatePopup from 'Components/Common/Popups/AddEstate/AddEstatePopup'


interface Props {
    estates?: estate[]
}

const EstateTable = ({ estates }: Props) => {
    const [openEstatePopup, setOpenEstatePopup] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const userId = useAppSelector(state => state.account.id)
    const estateClicked = (id: number) => {
        navigate(`${location.pathname}/selected/${id}`)
    }


    return (
        <div className={classes['estates-table']}>
            <div className={classes['estates-table--header-content']}>
                <span className={classes['estates-table--header']}>
                    Group Listings
                </span>
                <button onClick={() => setOpenEstatePopup(true)}>+ new listing</button>
            </div>
            {estates && estates?.map((estate, index) => {
                return <Estates
                    header={estate.header}
                    rating={estate.estate_ratings}
                    key={index}
                    click={() => estateClicked(estate.id)}
                    userId={userId}
                />
            })}
            {openEstatePopup && <AddEstatePopup close={() => setOpenEstatePopup(false)} />}
        </div>
    )
}


interface EstateProps {
    header: string,
    click: () => void,
    rating?: rating[],
    userId: number
}

const Estates = ({ header, click, rating, userId }: EstateProps) => {
    const [avgRating, setAvgRating] = useState(0)
    const [userRating, setUserRating] = useState(0)
    const price = 2400000

    useEffect(() => {
        if (!rating) return
        const ratingSum = rating.reduce((prevRating, currentRating) => prevRating + +currentRating.rating, 0)
        const avg = ratingSum / rating.length
        const userRating = rating.find(rating => rating.rating_owner_id == userId)
        if (userRating) setUserRating(+userRating.rating)
        setAvgRating(avg)
    }, [rating])


    return (
        <div className={classes['estate--container']} onClick={click}>
            <img className={classes['estate--image']} src="//cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262932514/0/0/0/438c4f5015a1f3f001cc41c9fe26fb9f/16/5ed9581da3892b561c174ee59b97f553/262932514-2e6c0f43-63bf-4d78-9071-134b2b16f837.JPG" />
            <div className={classes['estate--content']}>
                <div className={classes['estate--top']}>
                    <span className={classes['estate--header']}>{header}</span>
                    <span>${price.toLocaleString()}</span>
                </div>
                <div className={classes['estate--bottom']}>
                    <div className={classes['estate--ratings']}>
                        <span className={classes['estate--label']}>Avg Rating: <Tooltip title={avgRating}><Button><Rating size='small' disabled value={avgRating} max={10} precision={.5} /></Button></Tooltip></span>
                        <span className={classes['estate--label']}>Your Rating: <Tooltip title={userRating}><Button><Rating size='small' disabled value={userRating} max={10} precision={.5} /></Button></Tooltip></span>
                    </div>
                    <div className={classes['estate--date']}>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EstateTable
