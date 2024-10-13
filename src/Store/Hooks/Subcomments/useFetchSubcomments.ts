import { useQuery } from "@tanstack/react-query"
import fetchSubComments from "Assets/API/SubComments/fetchSubcomments"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


const useFetchSubComments = (id: string) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['fetchEstates', id],
        enabled: !!id,
        staleTime: 10,
        queryFn: () => fetchSubComments(id),
        retry: false,
        onSuccess: (data) => {
            const subcomments = data.data
            // dispatch(setEstates(estates))
        }
    })

    useEffect(() => {
        if (isError) navigate('/login')
    }, [isError])

    return { isLoading, data, isSuccess }
}

export default useFetchSubComments