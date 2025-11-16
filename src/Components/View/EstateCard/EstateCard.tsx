import React from 'react'
import estate from 'Assets/Types/EstateType'
import { Button, IconButton } from '@mui/material'
import Ratings from 'Components/View/Ratings/Ratings'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import classes from './EstateCard.module.scss'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useToggleLike from 'Store/Hooks/Estates/useToggleLike'

interface EstateCardProps {
    click: (id: number, tab?: string) => void,
    estate: estate,
    groupID: string,
    disableCommentButton?: boolean
}

const EstateCard = ({ click, estate, groupID, disableCommentButton }: EstateCardProps) => {
    const [isLiked, setIsLiked] = React.useState(estate.liked || false)
    const listingDetails = estate.listing_detail

    const { mutate, isLoading } = useToggleLike({
        complete: () => {
            setIsLiked(!isLiked)
        }
    })

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        mutate({ estate_id: estate.id, group_id: groupID })
    }

    return (
        <Card
            onClick={() => click(estate.id)}
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
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
                alt={estate.address || 'estate image'}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Box className={classes['estate-card--header']}>
                        <div className={classes['estate-card--top-level']}>
                            <div className={classes['estate-card--price']}>
                                {estate.price}
                            </div>
                            <IconButton
                                onClick={handleLikeClick}
                                disabled={isLoading}
                                aria-label="toggle like"
                                size="small"
                            >
                                {isLiked ? (
                                    <FavoriteIcon color="error" />
                                ) : (
                                    <FavoriteBorderIcon />
                                )}
                            </IconButton>
                        </div>
                        <div className={classes['estate-card--address']}>
                            {estate.address}
                        </div>
                        <div className={classes['estate-card--details']}>
                            {listingDetails?.bedrooms} bd &#8226; {listingDetails?.full_bathrooms} ba &#8226; {listingDetails?.sqft} sqft
                        </div>
                        <div className={classes['estate-card--details']}>
                            {listingDetails?.property_type}
                        </div>
                    </Box>
                </CardContent>

                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2, flexWrap: 'wrap' }}>
                    <Ratings estateId={estate.id} ratings={estate.estate_ratings} userRating={estate.user_rating} />
                    {
                        !disableCommentButton && (
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={(e) => { e.stopPropagation(); click(estate.id, 'comments'); }}
                                aria-label={`comments-${estate.id}`}
                            >
                                Comments ({estate.estate_comment_count})
                            </Button>
                        )
                    }
                </CardActions>
            </Box>
        </Card>
    )
}


export default EstateCard