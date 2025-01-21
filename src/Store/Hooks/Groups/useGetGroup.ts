import { useQuery } from "@tanstack/react-query"
import getGroup from "Assets/API/Groups/getGroup"
import { group } from "Assets/Types/GroupType"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



const useGetGroup = (id: string | undefined, complete: React.Dispatch<React.SetStateAction<group | undefined>>) => {
    const navigate = useNavigate()

    const { isLoading, isError, data, isSuccess, refetch } = useQuery({
        queryKey: ['fetchGroup', id],
        enabled: !!id,
        staleTime: 10,
        queryFn: () => getGroup(id),
        retry: false,
        onSuccess: (data) => {
            const group = data.data
            complete(group)
        }
    })

    useEffect(() => {

    }, [isError])

    return { isLoading, data, isSuccess, refetch }
}

export default useGetGroup