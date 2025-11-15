import { useMutation } from "@tanstack/react-query"
import postGroup, { PostGroupType } from "Assets/API/Groups/postGroup"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setGroupState } from "Store/Reducers/groups"

interface UsePostGroupProps {
    complete: () => void
}


const usePostGroup = ({ complete }: UsePostGroupProps) => {
    const dispatch = useDispatch()

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (body: PostGroupType) => postGroup(body),
        retry: false,
        onSuccess: (data) => {
            const groups = data.data
            dispatch(setGroupState(groups))
            complete()
        }
    })

    return { isLoading, mutate }
}

export default usePostGroup