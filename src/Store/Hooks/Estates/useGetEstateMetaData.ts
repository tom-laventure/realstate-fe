import { useQuery } from "@tanstack/react-query"
import getEstate from "Assets/API/Estates/getEstate"
import { useAppSelector } from "../useDispatch"
import getEstateMetaData from "Assets/API/Estates/getEstateMetaData"
import { estateMetaData } from "Assets/Types/EstateType"


const useGetEstateMetaData = (url: string, complete: (data: estateMetaData) => void) => {
    let selectedEstate = useAppSelector(state => state.estates.selectedEstate)

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['fetchEstates', url],
        enabled: !!url,
        staleTime: 10,
        queryFn: () => getEstateMetaData(url),
        retry: false,
        onSuccess: (data) => {
            complete(data.data)
        }
    })

    return { isLoading, data, isSuccess, selectedEstate }
}

export default useGetEstateMetaData