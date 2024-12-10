import { useMutation } from "@tanstack/react-query"
import postEstate, { PostEstateType } from "Assets/API/Estates/postEstate"
import { estateMetaData } from "Assets/Types/EstateType"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setGroupState } from "Store/Reducers/groups"

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
            complete()
        }
    })

    return { isLoading, mutate }
}

export default usePostEstate