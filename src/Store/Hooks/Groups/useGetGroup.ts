import { useQuery } from "@tanstack/react-query"
import fetchGroups from "Assets/API/Groups/fetchGroups"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setGroupState } from "Store/Reducers/groups"


const useGetGroup = (id: string) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['fetchGroup', id],
        staleTime: 10,
        queryFn: () => getGroup(),
        retry: false,
        onSuccess: (data) => {
            const groups = data.data

            dispatch(setGroupState(groups))
        }
    })

    useEffect(() => {
        if (isError) navigate('/login')
    }, [isError])

    return { isLoading, data, isSuccess }
}

export default useGetGroup