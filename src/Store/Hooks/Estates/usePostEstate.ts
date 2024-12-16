import { useMutation } from "@tanstack/react-query"
import postEstate, { PostEstateType } from "Assets/API/Estates/postEstate"
import { useDispatch } from "react-redux"
import { pushEstate } from "Store/Reducers/estates"

interface UsePostEstateProps {
    complete: () => void
}


const usePostEstate = ({ complete }: UsePostEstateProps) => {
    const dispatch = useDispatch()

    const { isLoading, mutate, isError } = useMutation({
        mutationFn: (data: PostEstateType) => postEstate(data),
        retry: false,
        onSuccess: (data) => {
            const estate = data.data
            dispatch(pushEstate(estate))
            complete()
        }
    })

    return { isLoading, mutate }
}

export default usePostEstate