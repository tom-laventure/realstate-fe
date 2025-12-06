import React, { useEffect, useState, MouseEvent } from 'react'
import classes from './Ratings.module.scss'
import { Rating } from '@mui/material'
import usePostRatings from 'Store/Hooks/Ratings/usePostRating'
import rating, { RatingResponse } from 'Assets/Types/EstateRatingType'
import UseEditRating from 'Store/Hooks/Ratings/useEditRating'
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

export interface RatingsPropTypes {
  estateId: number,
  ratings: rating[],
  userRating?: rating
}

const Ratings = ({ estateId, ratings, userRating }: RatingsPropTypes) => {
  const [avgRating, setAvgRating] = useState<number>(0)
  const [editRating, setEditRating] = useState(false)
  const [ratingState, setRatingState] = useState<RatingResponse>({
    estate_ratings: [],
    user_rating: {
      rating: '0'
    }
  })

  useEffect(() => {
    setRatingState((state) => {
      if (!userRating) return {
        ...state,
        estate_ratings: ratings
      }
      return {
        ...state,
        estate_ratings: ratings,
        user_rating: userRating,
      }
    })
  }, [estateId, ratings, userRating])

  useEffect(() => {
    const ratingSum = ratingState.estate_ratings.reduce((prevRating, currentRating) => prevRating + +currentRating.rating, 0)

    const avg = ratingSum / ratingState.estate_ratings.length

    setAvgRating(avg)

  }, [ratingState.estate_ratings])

  return (
    <div className={classes['ratings']}>
      <ExistingRatings
        currentRating={avgRating}
        userRatings={ratingState.estate_ratings}
      />
      {
        !editRating ?
          <UserRating
            editRating={() => setEditRating(true)}
            ratingValue={ratingState.user_rating?.rating}
          /> :
          <SetRating
            currentRating={ratingState.user_rating}
            cancelEdit={() => setEditRating(false)}
            estateId={estateId}
            setRatings={setRatingState}
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
        Group Rating:
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
  estateId: number,
  setRatings: React.Dispatch<React.SetStateAction<RatingResponse>>
}

const SetRating = ({ cancelEdit, currentRating, estateId, setRatings }: SetRatingProps) => {
  const complete = (data: RatingResponse) => {
    setRatings(data)
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
      <div className={classes['ratings--rating-container']}>
        <Rating size="small" precision={.5} onClick={e => e.stopPropagation()} defaultValue={currentRating?.rating ? +currentRating.rating : 0} max={10} onChange={(event, value) => saveRating(value)} />
      </div>
      <span className={classes['ratings--content__action']} onClick={e => { e.stopPropagation(); cancelEdit() }}><CancelIcon color='inherit' fontSize='small' /></span>
    </div >
  )
}

interface UserRatingProps {
  ratingValue?: string,
  editRating: () => void
}

const UserRating = ({ ratingValue = '0', editRating }: UserRatingProps) => {
  const editRatingClicked = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
    editRating()
    e.stopPropagation()
  }

  return (
    <div className={classes['ratings--content']}>
      <span className={classes['ratings--content__label']}>
        Your Rating:
      </span>
      <div className={classes['ratings--rating-container']}>
        <Rating size="small" value={+ratingValue} precision={.5} max={10} disabled />
      </div>
      <span onClick={e => editRatingClicked(e)} className={classes['ratings--content__action']}><EditIcon color='inherit' fontSize='small' /></span>
    </div>
  )
}


export default Ratings