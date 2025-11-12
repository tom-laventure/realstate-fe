import React, { useEffect, useState } from 'react'
import classes from './EstateTable.module.scss'
import estate from 'Assets/Types/EstateType'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import AddEstatePopup from 'Components/Common/Popups/AddEstate/AddEstatePopup'
import Ratings from 'Components/View/Ratings/Ratings'
import EstateFiltersForm from 'Components/Common/Form/EstateFilters/EstateFiltersForm'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface Props {
    estates?: estate[]
}

const EstateTable = ({ estates }: Props) => {
    const [openEstatePopup, setOpenEstatePopup] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
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
            <EstateFiltersForm />
            {estates && estates.map((estate) => {
                return <Estate
                    estate={estate}
                    key={estate.id}            // use stable key
                    click={() => estateClicked(estate.id)}
                />
            })}
            {openEstatePopup && <AddEstatePopup close={() => setOpenEstatePopup(false)} />}
        </div>
    )
}


interface EstateProps {
    click: () => void,
    estate: estate,
    disableCommentButton?: boolean
}

const Estate = ({ click, estate, disableCommentButton }: EstateProps) => {

    return (
        <Card
            onClick={click}
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' }, // stack on mobile, row on small+
                mb: 2,
                cursor: 'pointer'
            }}
            aria-label={`estate-${estate.id}`}
            elevation={2}
        >
            <CardMedia
                component="img"
                sx={{
                    width: { xs: '100%', sm: 160 },
                    height: { xs: 200, sm: 'auto' },
                    objectFit: 'cover'
                }}
                image={estate.image}
                alt={estate.header || 'estate image'}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Typography component="div" variant="h6">
                            {estate.header}
                        </Typography>
                        <Typography component="div" variant="subtitle1" color="text.secondary">
                            {estate.price}
                        </Typography>
                    </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2, flexWrap: 'wrap' }}>
                    <Ratings estateId={estate.id} ratings={estate.estate_ratings} userRating={estate.user_rating} />
                    {
                        !disableCommentButton && <Button
                            variant="outlined"
                            size="small"
                            onClick={(e) => { e.stopPropagation(); click(); }}
                            aria-label={`comments-${estate.id}`}
                        >
                            Comments ({estate.estate_comment_count})
                        </Button>
                    }
                </CardActions>
            </Box>
        </Card>
    )
}


export { Estate }
export default EstateTable
