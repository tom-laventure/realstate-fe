import { useMutation } from "@tanstack/react-query"
import editRating from "Assets/API/Ratings/editRating"
import postRating from "Assets/API/Ratings/postRating"
import rating from "Assets/Types/EstateRatingType"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setRatings } from "Store/Reducers/estates"

interface UseEditRatingProps {
    complete: () => void
}


const UseEditRating = ({ complete }: UseEditRatingProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (body: rating) => editRating(body),
        retry: false,
        onSuccess: (data) => {
            const ratings = data.data
            dispatch(setRatings(ratings))
            complete()
        }
    })

    return { isLoading, mutate }
}

export default UseEditRating