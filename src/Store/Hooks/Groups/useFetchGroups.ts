import { useQuery } from "@tanstack/react-query"
import fetchGroups from "Assets/API/Groups/fetchGroups"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const useFetchGroups = () => {
    const navigate = useNavigate()

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['fetchGroups'],
        queryFn: () => fetchGroups(),
        retry: false
    })
    
    useEffect(() => {
        if (isError) navigate('/login')
    }, [isError])

    return [isLoading, data, isSuccess]
}

export default useFetchGroups