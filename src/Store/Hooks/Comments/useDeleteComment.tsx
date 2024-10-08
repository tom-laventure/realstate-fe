import { useMutation, useQuery } from "@tanstack/react-query"
import deleteComment from "Assets/API/Comments/deleteComment"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addComment } from "Store/Reducers/estates"


const usePostComments = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (id: number) => deleteComment(id),
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