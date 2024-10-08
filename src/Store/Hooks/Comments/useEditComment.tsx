import { useMutation, useQuery } from "@tanstack/react-query"
import editComment from "Assets/API/Comments/editComment"
import comment from "Assets/Types/EstateCommentType"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { replaceComment } from "Store/Reducers/estates"


const useEditComments = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (body: comment) => editComment(body),
        retry: false,
        onSuccess: (data) => {
            const comment = data.data
            dispatch(replaceComment(comment))
        }
    })

    useEffect(() => {
        if (isError) navigate('/login')
    }, [isError])

    return { isLoading, mutate }
}

export default useEditComments