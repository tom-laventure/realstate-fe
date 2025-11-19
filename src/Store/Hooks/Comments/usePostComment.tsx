import { useMutation } from "@tanstack/react-query"
import postComment from "Assets/API/Comments/postComment"
import comment, { commentMetaData } from "Assets/Types/EstateCommentType"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addComment } from "Store/Reducers/estates"

interface UsePostCommentsProps {
    complete: () => void
}


const usePostComments = ({ complete }: UsePostCommentsProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (body: commentMetaData) => postComment(body),
        retry: false,
        onSuccess: (data) => {
            const comment = data.data
            dispatch(addComment(comment))
            complete()
        }
    })

    return { isLoading, mutate }
}

export default usePostComments