import { useQuery } from "@tanstack/react-query"
import getGroup from "Assets/API/Groups/getGroup"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"



const useGetGroup = (id: string | undefined) => {
    const navigate = useNavigate()

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['fetchGroup', id],
        enabled: !!id,
        staleTime: 10,
        queryFn: () => getGroup(id),
        retry: false,
        onSuccess: (data) => {

        }
    })

    useEffect(() => {
        if (isError) navigate('/login')
    }, [isError])

    return { isLoading, data, isSuccess }
}

export default useGetGroup