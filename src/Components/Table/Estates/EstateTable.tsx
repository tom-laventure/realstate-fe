import React, { useEffect, useState } from 'react'
import classes from './EstateTable.module.scss'
import estate from 'Assets/Types/EstateType'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Rating, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@mui/material'
import rating from 'Assets/Types/EstateRatingType'

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
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Property Label</TableCell>
                        <TableCell>Average Property Rating</TableCell>
                    </TableRow>

                </TableHead>
                <TableBody>
                    {estates && estates?.map((estate, index) => {
                        return <Estates header={estate.header} rating={estate.estate_ratings} key={index} click={() => estateClicked(estate.id)} />
                    })}
                </TableBody>
            </Table>
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

    useEffect(() => {
        if (!rating) return
        const ratingSum = rating.reduce((prevRating, currentRating) => prevRating + +currentRating.rating, 0)
        const avg = ratingSum / rating.length

        setAvgRating(avg)
    }, [rating])


    return (
        <TableRow className={classes['estate']} onClick={click}>
            <TableCell>{header}</TableCell>
            <TableCell>
                <Tooltip title={avgRating}><Button><Rating disabled value={avgRating} max={10} precision={.5} /></Button></Tooltip>
            </TableCell>
        </TableRow>
    )

}

export default EstateTable
