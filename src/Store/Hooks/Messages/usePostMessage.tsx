import { useMutation } from "@tanstack/react-query"
import postMessage from "Assets/API/Messages/postMessage"
import message from "Assets/Types/MessageType"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

interface UsePostMessageProps {
    complete: () => void
}


const usePostMessage = ({ complete }: UsePostMessageProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (body: message) => postMessage(body),
        retry: false,
        onSuccess: () => {
            complete()
        }
    })

    return { isLoading, mutate }
}

export default usePostMessage