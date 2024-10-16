import { useMutation, useQuery } from "@tanstack/react-query"
import editComment from "Assets/API/Comments/editComment"
import comment from "Assets/Types/EstateCommentType"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setComments } from "Store/Reducers/estates"


interface UseEditCommentsProps {
    complete: () => void
}

const useEditComments = ({ complete }: UseEditCommentsProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (body: comment) => editComment(body),
        retry: false,
        onSuccess: (data) => {
            const comment = data.data
            dispatch(setComments(comment))
            complete()
        }
    })

    return { isLoading, mutate }
}

export default useEditComments