import React, { useEffect, useState } from 'react'
import classes from './EstateTable.module.scss'
import estate from 'Assets/Types/EstateType'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Rating, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material'
import rating from 'Assets/Types/EstateRatingType'
import placeholder from 'Assets/Images/placeholder.png'
interface Props {
    estates?: estate[]
}

const EstateTable = ({ estates }: Props) => {
    const location = useLocation()
    const navigate = useNavigate()

    const estateClicked = (id: number) => {
        navigate(`${location.pathname}/selected/${id}`)
    }


    return (
        <div className={classes['estates-table']}>

            {estates && estates?.map((estate, index) => {
                return <Estates header={estate.header} rating={estate.estate_ratings} key={index} click={() => estateClicked(estate.id)} />
            })}
        </div>
    )
}


interface EstateProps {
    header: string,
    click: () => void,
    rating?: rating[]
}

const Estates = ({ header, click, rating }: EstateProps) => {
    const [avgRating, setAvgRating] = useState(0)
    const [userRating, setUserRating] = useState(0)
    const price = 2400000
    useEffect(() => {
        if (!rating) return
        const ratingSum = rating.reduce((prevRating, currentRating) => prevRating + +currentRating.rating, 0)
        const avg = ratingSum / rating.length

        setAvgRating(avg)
    }, [rating])


    return (
        <div className={classes['estate--container']} onClick={click}>
            <img className={classes['estate--image']} src={placeholder} />
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
