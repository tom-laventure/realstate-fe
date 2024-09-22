import { useQuery } from "@tanstack/react-query"
import fetchGroups from "Assets/API/Groups/fetchGroups"
import { useNavigate } from "react-router-dom"


const useFetchGroups = () => {
    const navigate = useNavigate()

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['fetchGroups'],
        queryFn: () => fetchGroups()
    })
    console.log(data)
    if (isError) navigate('/')

    return [isLoading, data, isSuccess]
}

export default useFetchGroups