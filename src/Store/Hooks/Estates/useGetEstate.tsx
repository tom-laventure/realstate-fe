import { useQuery } from "@tanstack/react-query"
import getEstate from "Assets/API/Estates/getEstate"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setEstates, setSelectedEstate } from "Store/Reducers/estates"
import { useAppSelector } from "../useDispatch"


const useGetEstate = (id: string | undefined, estateId: string | undefined) => {
    const dispatch = useDispatch()
    let selectedEstate = useAppSelector(state => state.estates.selectedEstate)

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['getEstate', estateId],
        enabled: !!id && !!estateId,
        staleTime: 10,
        queryFn: () => getEstate(id, estateId),
        retry: false,
        onSuccess: (data) => {
            const estates = data.data
            dispatch(setSelectedEstate(estates.selected_estate))
            selectedEstate = estates.selected_estate
        }
    })

    return { isLoading, data, isSuccess, selectedEstate }
}

export default useGetEstate