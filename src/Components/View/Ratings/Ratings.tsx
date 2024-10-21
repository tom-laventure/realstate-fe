import React, { MouseEvent, useEffect, useMemo, useState } from 'react'
import classes from './Ratings.module.scss'
import { Button, Rating } from '@mui/material'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import usePostRatings from 'Store/Hooks/Ratings/usePostRating'
import { useParams } from 'react-router-dom'
import rating from 'Assets/Types/EstateRatingType'
import UseEditRating from 'Store/Hooks/Ratings/useEditRating'

const Ratings = () => {
  const [avgRating, setAvgRating] = useState<number>(0)
  const [editRating, setEditRating] = useState(false)
  const ratings = useAppSelector(state => state.estates.selectedEstate.estate_ratings)
  const userHasRated = useAppSelector(state => state.estates.selectedEstate.user_rating)

  useEffect(() => {
    const ratingSum = ratings.reduce((prevRating, currentRating) => prevRating + +currentRating.rating, 0)
    const avg = ratingSum / ratings.length

    setAvgRating(avg)

  }, [ratings])

  return (
    <div className={classes['ratings']}>
      <ExistingRatings currentRating={avgRating} />
      {
        userHasRated && !editRating ?
          <UserRating
            editRating={() => setEditRating(true)}
            ratingValue={userHasRated.rating}
          /> :
          <SetRating
            currentRating={userHasRated}
            cancelEdit={() => setEditRating(false)}
          />
      }
    </div>
  )
}

interface ExistingRatings {
  currentRating: number
}


const ExistingRatings = ({ currentRating }: ExistingRatings) => {


  return (
    <div>
      <div>
        Current Average Rating:
      </div>
      <Rating value={currentRating} disabled precision={.5} max={10} />
    </div>
  )
}


interface SetRatingProps {
  cancelEdit: () => void,
  currentRating: rating | undefined
}

const SetRating = ({ cancelEdit, currentRating }: SetRatingProps) => {
  const { estate_id: estateId } = useParams()
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
    <div>
      <div>
        Rate this property:
      </div>
      <Rating precision={.5} defaultValue={currentRating?.rating ? +currentRating.rating : 0} max={10} onChange={(event, value) => saveRating(value)} />
      <div>
        <Button size='small' onClick={cancelEdit}>cancel</Button>
      </div>
    </div>
  )
}

interface UserRatingProps {
  ratingValue: string,
  editRating: () => void
}

const UserRating = ({ ratingValue, editRating }: UserRatingProps) => {
  return (
    <div>
      <div>
        Your Rating:
      </div>
      <Rating value={+ratingValue} precision={.5} max={10} disabled />
      <div>
        <Button onClick={editRating} size='small'>edit rating</Button>
      </div>
    </div>
  )
}


export default Ratings