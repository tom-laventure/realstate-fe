import { useQuery } from "@tanstack/react-query"
import fetchEstate from "Assets/API/Estates/fetchEstates"
import fetchMessages from "Assets/API/Messages/fetchMessages"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setEstates } from "Store/Reducers/estates"
import { setGroupState } from "Store/Reducers/groups"
import { prependMessage, setMessages } from "Store/Reducers/messages"


const useFetchMessages = (id: string | undefined, page: number) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['fetchMessages', id, page],
        enabled: !!id,
        staleTime: 10,
        queryFn: () => fetchMessages(id, page),
        retry: false,
        onSuccess: (data) => {
            const messages = data.data
            if (page === 0) dispatch(setMessages(messages))
            else dispatch(prependMessage(messages))
        }
    })

    useEffect(() => {
        if (isError) navigate('/login')
    }, [isError])

    return { isLoading, data, isSuccess }
}

export default useFetchMessages