import { useMutation, useQuery } from "@tanstack/react-query"
import postComment from "Assets/API/Comments/postComment"
import fetchEstate from "Assets/API/Estates/fetchEstates"
import comment from "Assets/Types/EstateCommentType"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addComment, setEstates } from "Store/Reducers/estates"


const usePostComments = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (body: comment) => postComment(body),
        retry: false,
        onSuccess: (data) => {
            const comment = data.data
            dispatch(addComment(comment))
        }
    })

    useEffect(() => {
        if (isError) navigate('/login')
    }, [isError])

    return { isLoading, mutate }
}

export default usePostComments