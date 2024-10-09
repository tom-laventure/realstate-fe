import { useMutation, useQuery } from "@tanstack/react-query"
import deleteComment, { DeleteCommentProps } from "Assets/API/Comments/deleteComment"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setComments } from "Store/Reducers/estates"

interface UseDeleteCommentProps {
    complete?: () => void
}

const useDeleteComment = ({ complete }: UseDeleteCommentProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (body: DeleteCommentProps) => deleteComment(body),
        retry: false,
        onSuccess: (data) => {
            const comment = data.data
            dispatch(setComments(comment))
            if (complete) complete()
        }
    })

    useEffect(() => {
        if (isError) navigate('/login')
    }, [isError])

    return { isLoading, mutate }
}

export default useDeleteComment