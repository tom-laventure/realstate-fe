import React, { MouseEvent, useEffect, useMemo, useState } from 'react'
import classes from './Ratings.module.scss'
import { Button, Popover, Rating, Typography } from '@mui/material'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import usePostRatings from 'Store/Hooks/Ratings/usePostRating'
import { useParams } from 'react-router-dom'
import rating from 'Assets/Types/EstateRatingType'
import UseEditRating from 'Store/Hooks/Ratings/useEditRating'
import MouseHoverPopover from 'Components/Common/Popups/MouseHoverPopover'

interface RatingsPropTypes {
  estateId: number,
  ratings: rating[],
  userHasRated?: rating
}

const Ratings = ({ estateId, ratings, userHasRated }: RatingsPropTypes) => {
  console.log(ratings, userHasRated)

  const [avgRating, setAvgRating] = useState<number>(0)
  const [editRating, setEditRating] = useState(false)

  useEffect(() => {
    const ratingSum = ratings.reduce((prevRating, currentRating) => prevRating + +currentRating.rating, 0)
    const avg = ratingSum / ratings.length

    setAvgRating(avg)

  }, [ratings])

  return (
    <div className={classes['ratings']}>
      <ExistingRatings
        currentRating={avgRating}
        userRatings={ratings}
      />
      {
        !editRating ?
          <UserRating
            editRating={() => setEditRating(true)}
            ratingValue={userHasRated?.rating}
          /> :
          <SetRating
            currentRating={userHasRated}
            cancelEdit={() => setEditRating(false)}
            estateId={estateId}
          />
      }
    </div>
  )
}

interface ExistingRatings {
  currentRating: number,
  userRatings: rating[]
}


const ExistingRatings = ({ currentRating, userRatings }: ExistingRatings) => {

  const ratingList = userRatings.map((rating, index) => {
    return <div key={index} className={classes['ratings__popup']}>
      <span className={classes['ratings__popup--name']}>{rating.rating_owner}</span> <Rating size='small' value={+rating.rating} max={10} disabled />
    </div>
  })

  return (
    <div className={classes['ratings--content']}>
      <span className={classes['ratings--content__label']}>
        Avg Rating:
      </span>
      <div className={classes['ratings--rating-container']}>
        <Rating size="small" value={currentRating} disabled precision={.5} max={10} />
        {/* <MouseHoverPopover label={rating}><>{ratingList}</></MouseHoverPopover> */}
      </div>
    </div>
  )
}


interface SetRatingProps {
  cancelEdit: () => void,
  currentRating: rating | undefined,
  estateId: number
}

const SetRating = ({ cancelEdit, currentRating, estateId }: SetRatingProps) => {
  const complete = () => {
    cancelEdit()
  }

  const { mutate: postRating } = usePostRatings({ complete })
  const { mutate: editRating } = UseEditRating({ complete })

  const saveRating = (newRating: number | null) => {
    if (!newRating) return

    const body = {
      estate_id: estateId,
      rating: newRating.toString(),
      id: currentRating?.id
    }

    if (currentRating?.id) editRating(body)
    else postRating(body)
  }

  return (
    <div className={classes['ratings--content']}>
      <span className={classes['ratings--content__label']}>
        Your Rating:
      </span>
      <Rating size="small" precision={.5} defaultValue={currentRating?.rating ? +currentRating.rating : 0} max={10} onChange={(event, value) => saveRating(value)} />
      <span className={classes['ratings--content__action']} onClick={cancelEdit}>cancel</span>
    </div>
  )
}

interface UserRatingProps {
  ratingValue?: string,
  editRating: () => void
}

const UserRating = ({ ratingValue = '0', editRating }: UserRatingProps) => {
  return (
    <div className={classes['ratings--content']}>
      <span className={classes['ratings--content__label']}>
        Your Rating:
      </span>
      <div className={classes['ratings--rating-container']}>
        <Rating size="small" value={+ratingValue} precision={.5} max={10} disabled />
      </div>
      <span onClick={editRating} className={classes['ratings--content__action']}>edit</span>
    </div>
  )
}


export default Ratings