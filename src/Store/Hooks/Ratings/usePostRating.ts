import { useMutation } from "@tanstack/react-query"
import postRating from "Assets/API/Ratings/postRating"
import rating, { RatingResponse } from "Assets/Types/EstateRatingType"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setRatings } from "Store/Reducers/estates"

interface UsePostRatingProps {
    complete: (data: RatingResponse) => void
}


const usePostRatings = ({ complete }: UsePostRatingProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (body: rating) => postRating(body),
        retry: false,
        onSuccess: (data) => {
            const ratings = data.data
            dispatch(setRatings(ratings))
            complete(ratings)
        }
    })

    return { isLoading, mutate }
}

export default usePostRatings