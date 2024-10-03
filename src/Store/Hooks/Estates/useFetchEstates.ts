import { useQuery } from "@tanstack/react-query"
import fetchEstate from "Assets/API/Estates/fetchEstates"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setEstates } from "Store/Reducers/estates"


const useFetchEstates = (id: string | undefined) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['fetchEstates', id],
        enabled: !!id,
        staleTime: 10,
        queryFn: () => fetchEstate(id),
        retry: false,
        onSuccess: (data) => {
            const estates = data.data
            dispatch(setEstates(estates))
        }
    })

    useEffect(() => {
        if (isError) navigate('/login')
    }, [isError])

    return { isLoading, data, isSuccess }
}

export default useFetchEstates