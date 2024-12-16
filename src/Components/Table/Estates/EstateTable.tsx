import React, { useEffect, useState } from 'react'
import classes from './EstateTable.module.scss'
import estate from 'Assets/Types/EstateType'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Rating, Tooltip } from '@mui/material'
import rating from 'Assets/Types/EstateRatingType'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import AddEstatePopup from 'Components/Common/Popups/AddEstate/AddEstatePopup'
import Ratings from 'Components/View/Ratings/Ratings'


interface Props {
    estates?: estate[]
}

const EstateTable = ({ estates }: Props) => {
    const [openEstatePopup, setOpenEstatePopup] = useState(false)
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
                    estate={estate}
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
    click: () => void,
    userId: number,
    estate: estate
}

const Estates = ({ click, estate, userId }: EstateProps) => {
    const [avgRating, setAvgRating] = useState(0)
    const [userRating, setUserRating] = useState(0)
    const [ratingMessage, setRatingMessage] = useState('add rating')
    useEffect(() => {
        if (!estate.estate_ratings) return
        const ratingSum = estate.estate_ratings.reduce((prevRating, currentRating) => prevRating + +currentRating.rating, 0)
        const avg = ratingSum / estate.estate_ratings.length
        const userRating = estate.estate_ratings.find(rating => rating.rating_owner_id == userId)
        if (userRating) setUserRating(+userRating.rating)
        setAvgRating(avg)
    }, [estate.estate_ratings])



    return (
        <div className={classes['estate--container']}>
            <div className={classes['estate--body']}>
                <img className={classes['estate--image']} src={estate.image} />
                <div className={classes['estate--content']}>
                    <div className={classes['estate--top']}>
                        <span className={classes['estate--header']}>{estate.header}</span>
                        <span>{estate.price}</span>
                    </div>
                    <div className={classes['estate--bottom']}>
                        <Ratings estateId={estate.id} ratings={estate.estate_ratings} userHasRated={estate.user_rating}/>
                        <div className={classes['estate--date']}>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes['estate--actions']}>
                <Button>Comments &#40;{0}&#41;</Button>
                <Button onClick={() => window.open(estate.link, '_blank')}>View Listing</Button>
            </div>
        </div>
    )

}

export default EstateTable
