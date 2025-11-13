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
import Badge from '@mui/material/Badge'

interface EstateCardProps {
    click: () => void,
    estate: estate,
    disableCommentButton?: boolean
}

const EstateCard = ({ click, estate, disableCommentButton }: EstateCardProps) => {

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
                        !disableCommentButton && (
                            <Badge
                                badgeContent={estate.estate_comment_count ?? 0}
                                color="primary"
                                overlap="rectangular"
                            >
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={(e) => { e.stopPropagation(); click(); }}
                                    aria-label={`comments-${estate.id}`}
                                >
                                    Comments
                                </Button>
                            </Badge>
                        )
                    }
                </CardActions>
            </Box>
        </Card>
    )
}


export default EstateCard