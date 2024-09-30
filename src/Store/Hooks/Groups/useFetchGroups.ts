import { useQuery } from "@tanstack/react-query"
import fetchGroups from "Assets/API/Groups/fetchGroups"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setGroups } from "Store/Reducers/groups"


const useFetchGroups = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['fetchGroups'],
        staleTime: 10,
        queryFn: () => fetchGroups(),
        retry: false,
        onSuccess: (data) => {
            const groups = data.data
            dispatch(setGroups(groups.data))
        }
    })

    useEffect(() => {
        if (isError) navigate('/login')
    }, [isError])

    return {isLoading, data, isSuccess}
}

export default useFetchGroups