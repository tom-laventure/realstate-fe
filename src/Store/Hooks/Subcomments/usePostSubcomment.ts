import { useMutation } from "@tanstack/react-query"
import postSubComment from "Assets/API/SubComments/postSubcomment"
import subcomment from "Assets/Types/EstateSubCommentType"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

interface UsePostSubcommentsProps {
    complete: () => void
}


const usePostSubcomments = ({complete}: UsePostSubcommentsProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (body: subcomment) => postSubComment(body),
        retry: false,
        onSuccess: (data) => {
            const comment = data.data
            // dispatch()
            complete()
        }
    })

    return { isLoading, mutate }
}

export default usePostSubcomments