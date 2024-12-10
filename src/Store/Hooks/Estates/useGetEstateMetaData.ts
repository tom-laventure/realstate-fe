import { useQuery } from "@tanstack/react-query"
import { useAppSelector } from "../useDispatch"
import getEstateMetaData from "Assets/API/Estates/getEstateMetaData"
import { estateMetaData } from "Assets/Types/EstateType"
import { UseFormReset } from "react-hook-form"


const useGetEstateMetaData = (url: string, complete: UseFormReset<estateMetaData>) => {
    let selectedEstate = useAppSelector(state => state.estates.selectedEstate)

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['fetchEstates', url],
        enabled: !!url,
        staleTime: 10,
        queryFn: () => {
            const encodedUrl = encodeURIComponent(url)
            return getEstateMetaData(encodedUrl)
        },
        retry: false,
        onSuccess: (data) => {
            complete(data.data)
        }
    })

    return { isLoading, data, isSuccess, selectedEstate }
}

export default useGetEstateMetaData