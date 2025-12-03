import { useQuery } from "@tanstack/react-query"
import fetchEstate, { FetchEstateType } from "Assets/API/Estates/fetchEstates"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setEstates } from "Store/Reducers/estates"
import { setGroupState, setSelectedGroup } from "Store/Reducers/groups"

const useFetchEstates = (params: FetchEstateType) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['fetchEstates', params.id, params.order, params.favorites_only, params.filter_by],
        enabled: !!params.id,
        staleTime: 10,
        queryFn: () => fetchEstate(params),
        retry: false,
        onSuccess: (data) => {
            const estates = data.data
            dispatch(setEstates(estates.estates))
            dispatch(setSelectedGroup(estates.group))
        }
    })

    useEffect(() => {
        if (isError) navigate('/login')
    }, [isError])

    return { isLoading, data, isSuccess }
}

export default useFetchEstates