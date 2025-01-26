import { useQuery } from "@tanstack/react-query"
import getGroup from "Assets/API/Groups/getGroup"
import { group } from "Assets/Types/GroupType"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



const useGetGroup = (id: string | undefined, complete: ({group, in_group}: {group: group, in_group: boolean}) => void) => {
    const navigate = useNavigate()

    const { isLoading, isError, data, isSuccess, refetch } = useQuery({
        queryKey: ['fetchGroup', id],
        enabled: !!id,
        staleTime: 10,
        queryFn: () => getGroup(id),
        retry: false,
        onSuccess: (data) => {
            const res = data.data
            complete({group: res.group, in_group: res.in_group})
        }
    })

    useEffect(() => {

    }, [isError])

    return { isLoading, data, isSuccess, refetch }
}

export default useGetGroup