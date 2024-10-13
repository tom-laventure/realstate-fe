import { useQuery } from "@tanstack/react-query"
import fetchSubComments from "Assets/API/SubComments/fetchSubcomments"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSubcomments } from "Store/Reducers/subcomments"


const useFetchSubComments = (id: string | undefined) => {
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
            dispatch(setSubcomments(subcomments))
        }
    })

    return { isLoading, data, isSuccess }
}

export default useFetchSubComments